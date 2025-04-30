import React, { useState, useEffect } from "react";
import { Purchase } from "../types/Purchase";
import { getPurchases, createPurchase, updatePurchase, deletePurchase } from "../services/purchasesService";
import { Customer } from "../types/Customer";
import { getCustomers } from "../services/customerService";
import { Microtransaction } from "../types/Microtransaction";
import { getMicrotransactions } from "../services/microtransactionsService";

// Helper: Convert stored ISO date string to "YYYY-MM-DD" for a date input.
// Use UTC getters to avoid timezone offset issues
const getInputDate = (dateString: string): string => {
  const d = new Date(dateString);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper: Format date string for display (year, month, and day only)
// Note: Bug displaying one day earlier
// Note: Handle hours-minutes-seconds
// Note: Add timezone to Purchase db schema
const formatDisplayDate = (dateString: string): string => {
  const d = new Date(dateString);
  return d.toLocaleDateString();
};

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Microtransaction[]>([]);
  const [formData, setFormData] = useState({
    customerID: "",
    microtransactionID: "",
    date: ""
  });
  const [editing, setEditing] = useState<Purchase | null>(null);

  const fetchPurchases = async () => {
    try {
      const data = await getPurchases();
      setPurchases(data);
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getMicrotransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching microtransactions:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
    fetchCustomers();
    fetchTransactions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this purchase?`))
      return;

    const payload = {
      customerID: Number(formData.customerID),
      microtransactionID: Number(formData.microtransactionID),
      date: formData.date, // in "YYYY-MM-DD" format
    };

    try {
      if (editing) {
        await updatePurchase(editing.purchaseID, payload);
      } else {
        await createPurchase(payload);
      }
      await fetchPurchases();
      setEditing(null);
      setFormData({ customerID: "", microtransactionID: "", date: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (p: Purchase) => {
    setEditing(p);
    setFormData({
      customerID: p.customerID.toString(),
      microtransactionID: p.microtransactionID.toString(),
      date: getInputDate(p.date),
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this purchase?"))
      return;
    try {
      await deletePurchase(id);
      await fetchPurchases();
    } catch (err) {
      console.error("Error deleting purchase:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Purchases</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        {/* Dropdown for Customer */}
        <div className="mb-4">
          <label className="block mb-1">Customer:</label>
          <select
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((cust) => (
              <option key={cust.customerID} value={cust.customerID}>
                {cust.username}
              </option>
            ))}
          </select>
        </div>
        {/* Dropdown for Microtransaction */}
        <div className="mb-4">
          <label className="block mb-1">Microtransaction:</label>
          <select
            name="microtransactionID"
            value={formData.microtransactionID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Microtransaction</option>
            {transactions.map((tx) => (
              <option key={tx.microtransactionID} value={tx.microtransactionID}>
                {`${tx.description} - $${tx.price}`}
              </option>
            ))}
          </select>
        </div>
        {/* Date Input (only year, month, day) */}
        <div className="mb-4">
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? "Update Purchase" : "Create Purchase"}
        </button>
      </form>
      
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {/* Removed PurchaseID column */}
            <th className="py-2 border-b">Customer</th>
            <th className="py-2 border-b">Microtransaction</th>
            <th className="py-2 border-b">Date</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.purchaseID} className="text-center">
              <td className="py-2 border-b">
                {(() => {
                  const cust = customers.find(c => c.customerID === purchase.customerID);
                  return cust ? cust.username : purchase.customerID;
                })()}
              </td>
              <td className="py-2 border-b">
                {(() => {
                  const tx = transactions.find(t => t.microtransactionID === purchase.microtransactionID);
                  return tx ? `${tx.description} - $${tx.price}` : purchase.microtransactionID;
                })()}
              </td>
              <td className="py-2 border-b">{formatDisplayDate(purchase.date)}</td>
              <td className="py-2 border-b space-x-2">
                <button onClick={() => handleEdit(purchase)} className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(purchase.purchaseID)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesPage;
