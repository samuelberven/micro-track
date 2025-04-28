import React, { useState, useEffect } from 'react';
import { CustomersHaveGames } from '../types/CustomerHasGame';

const CustomersHaveGamesPage = () => {
  const [records, setRecords] = useState<CustomersHaveGames[]>([]);
  const [formData, setFormData] = useState({
    customerID: '',
    gameID: '',
    installDate: ''
  });
  const [editing, setEditing] = useState<CustomersHaveGames | null>(null);

  const fetchRecords = () => {
    fetch('/api/customers-have-games')
      .then((res) => res.json())
      .then(setRecords)
      .catch(console.error);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing
      ? `/api/customers-have-games/${editing.customersHaveGamesID}`
      : '/api/customers-have-games';
    const body = {
      ...formData,
      customerID: Number(formData.customerID),
      gameID: Number(formData.gameID)
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        fetchRecords();
        setEditing(null);
        setFormData({ customerID: '', gameID: '', installDate: '' });
      })
      .catch(console.error);
  };

  const handleEdit = (record: CustomersHaveGames) => {
    setEditing(record);
    setFormData({
      customerID: record.customerID.toString(),
      gameID: record.gameID.toString(),
      installDate: record.installDate,
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/customers-have-games/${id}`, { method: 'DELETE' })
      .then(fetchRecords)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customers Have Games</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Customer ID:</label>
          <input
            type="text"
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Game ID:</label>
          <input
            type="text"
            name="gameID"
            value={formData.gameID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Install Date:</label>
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? 'Update Record' : 'Create Record'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Customer ID</th>
            <th className="py-2 border-b">Game ID</th>
            <th className="py-2 border-b">Install Date</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.customersHaveGamesID} className="text-center">
              <td className="py-2 border-b">{record.customersHaveGamesID}</td>
              <td className="py-2 border-b">{record.customerID}</td>
              <td className="py-2 border-b">{record.gameID}</td>
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
