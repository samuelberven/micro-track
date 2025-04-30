import React, { useState, useEffect } from "react";
import { CustomersHaveGames } from "../types/CustomerHasGame";
import {
  getCustomersHaveGames,
  createCustomersHaveGames,
  updateCustomersHaveGames,
  deleteCustomersHaveGames,
} from "../services/customersHaveGamesService";
import { Customer } from "../types/Customer";
import { getCustomers } from "../services/customerService";
import { Game } from "../types/Game";
import { getGames } from "../services/gamesService";

const CustomersHaveGamesPage: React.FC = () => {
  const [records, setRecords] = useState<CustomersHaveGames[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState({
    customerID: "",
    gameID: "",
    installDate: ""
  });
  const [editing, setEditing] = useState<CustomersHaveGames | null>(null);

  const fetchRecords = async () => {
    try {
      const data = await getCustomersHaveGames();
      setRecords(data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const fetchCustomersList = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const fetchGamesList = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCustomersList();
    fetchGamesList();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build and log payload
    const payload = {
      customerID: Number(formData.customerID),
      gameID: Number(formData.gameID),
      installDate: formData.installDate, // e.g., "YYYY-MM-DD"
    };
    console.log("Submitting CustomersHaveGames payload:", payload);

    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this record?`)) return;

    try {
      if (editing) {
        await updateCustomersHaveGames(editing.customersHaveGamesID, payload);
      } else {
        await createCustomersHaveGames(payload);
      }
      await fetchRecords();
      setEditing(null);
      setFormData({ customerID: "", gameID: "", installDate: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (record: CustomersHaveGames) => {
    setEditing(record);
    setFormData({
      customerID: record.customerID.toString(),
      gameID: record.gameID.toString(),
      installDate: record.installDate, // Ensure this value is in "YYYY-MM-DD" format
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteCustomersHaveGames(id);
      await fetchRecords();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customers Have Games</h2>
      
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        {/* Customer Dropdown */}
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
        {/* Game Dropdown */}
        <div className="mb-4">
          <label className="block mb-1">Game:</label>
          <select
            name="gameID"
            value={formData.gameID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Game</option>
            {games.map((game) => (
              <option key={game.gameID} value={game.gameID}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
        {/* Install Date */}
        <div className="mb-4">
          <label className="block mb-1">Install Date:</label>
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? "Update Record" : "Create Record"}
        </button>
      </form>
      
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="text-center">
            <th className="py-2 border-b">Customer</th>
            <th className="py-2 border-b">Game</th>
            <th className="py-2 border-b">Install Date</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.customersHaveGamesID} className="text-center">
              <td className="py-2 border-b">
                {(() => {
                  const cust = customers.find(c => c.customerID === record.customerID);
                  return cust ? cust.username : record.customerID;
                })()}
              </td>
              <td className="py-2 border-b">
                {(() => {
                  const game = games.find(g => g.gameID === record.gameID);
                  return game ? game.title : record.gameID;
                })()}
              </td>
              <td className="py-2 border-b">{record.installDate}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(record)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(record.customersHaveGamesID)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default CustomersHaveGamesPage;
