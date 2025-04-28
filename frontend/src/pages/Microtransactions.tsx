import React, { useState, useEffect } from 'react';
import { Microtransaction } from '../types/Microtransaction';

const MicrotransactionsPage = () => {
  const [microtransactions, setMicrotransactions] = useState<Microtransaction[]>([]);
  const [formData, setFormData] = useState({
    gameID: '',
    price: '',
    description: ''
  });
  const [editing, setEditing] = useState<Microtransaction | null>(null);

  const fetchMicrotransactions = () => {
    fetch('/api/microtransactions')
      .then((res) => res.json())
      .then(setMicrotransactions)
      .catch(console.error);
  };

  useEffect(() => {
    fetchMicrotransactions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing
      ? `/api/microtransactions/${editing.microtransactionID}`
      : '/api/microtransactions';
    const body = {
      ...formData,
      gameID: Number(formData.gameID),
      price: Number(formData.price)
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        fetchMicrotransactions();
        setEditing(null);
        setFormData({ gameID: '', price: '', description: '' });
      })
      .catch(console.error);
  };

  const handleEdit = (mt: Microtransaction) => {
    setEditing(mt);
    setFormData({
      gameID: mt.gameID.toString(),
      price: mt.price.toString(),
      description: mt.description,
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/microtransactions/${id}`, { method: 'DELETE' })
      .then(fetchMicrotransactions)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Microtransactions</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
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
          <label className="block mb-1">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? 'Update Microtransaction' : 'Create Microtransaction'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Game ID</th>
            <th className="py-2 border-b">Price</th>
            <th className="py-2 border-b">Description</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {microtransactions.map((mt) => (
            <tr key={mt.microtransactionID} className="text-center">
              <td className="py-2 border-b">{mt.microtransactionID}</td>
              <td className="py-2 border-b">{mt.gameID}</td>
              <td className="py-2 border-b">{mt.price}</td>
              <td className="py-2 border-b">{mt.description}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(mt)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(mt.microtransactionID)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default MicrotransactionsPage;
