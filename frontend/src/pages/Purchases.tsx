import React, { useState, useEffect } from 'react';
import { Purchase } from '../types/Purchase';

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [formData, setFormData] = useState({
    customerID: '',
    microtransactionID: '',
    date: ''
  });
  const [editing, setEditing] = useState<Purchase | null>(null);

  const fetchPurchases = () => {
    fetch('/api/purchases')
      .then((res) => res.json())
      .then(setPurchases)
      .catch(console.error);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing ? `/api/purchases/${editing.purchaseID}` : '/api/purchases';
    const body = {
      ...formData,
      customerID: formData.customerID ? Number(formData.customerID) : null,
      microtransactionID: Number(formData.microtransactionID)
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        fetchPurchases();
        setEditing(null);
        setFormData({ customerID: '', microtransactionID: '', date: '' });
      })
      .catch(console.error);
  };

  const handleEdit = (purchase: Purchase) => {
    setEditing(purchase);
    setFormData({
      customerID: purchase.customerID ? purchase.customerID.toString() : '',
      microtransactionID: purchase.microtransactionID.toString(),
      date: purchase.date.toString().split('T')[0],
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/purchases/${id}`, { method: 'DELETE' })
      .then(fetchPurchases)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Purchases</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Customer ID (optional):</label>
          <input
            type="text"
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Microtransaction ID:</label>
          <input
            type="text"
            name="microtransactionID"
            value={formData.microtransactionID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
          {editing ? 'Update Purchase' : 'Create Purchase'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Customer ID</th>
            <th className="py-2 border-b">Microtransaction ID</th>
            <th className="py-2 border-b">Date</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.purchaseID} className="text-center">
              <td className="py-2 border-b">{purchase.purchaseID}</td>
              <td className="py-2 border-b">{purchase.customerID || 'NULL'}</td>
              <td className="py-2 border-b">{purchase.microtransactionID}</td>
              <td className="py-2 border-b">{purchase.date}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(purchase)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
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
