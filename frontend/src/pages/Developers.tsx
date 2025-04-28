import React, { useState, useEffect } from 'react';
import { Developer } from '../types/Developer';

const DevelopersPage = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [formData, setFormData] = useState({
    developerName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    contact: ''
  });
  const [editing, setEditing] = useState<Developer | null>(null);

  const fetchDevelopers = () => {
    fetch('/api/developers')
      .then((res) => res.json())
      .then(setDevelopers)
      .catch(console.error);
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing ? `/api/developers/${editing.developerID}` : '/api/developers';
    const body = { ...formData, zipCode: Number(formData.zipCode) };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        fetchDevelopers();
        setEditing(null);
        setFormData({
          developerName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          email: '',
          contact: ''
        });
      })
      .catch(console.error);
  };

  const handleEdit = (developer: Developer) => {
    setEditing(developer);
    setFormData({
      developerName: developer.developerName,
      address: developer.address,
      city: developer.city,
      state: developer.state,
      zipCode: developer.zipCode.toString(),
      email: developer.email,
      contact: developer.contact,
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/developers/${id}`, { method: 'DELETE' })
      .then(fetchDevelopers)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Developers</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Developer Name:</label>
          <input
            type="text"
            name="developerName"
            value={formData.developerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">ZIP Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? 'Update Developer' : 'Create Developer'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev) => (
            <tr key={dev.developerID} className="text-center">
              <td className="py-2 border-b">{dev.developerID}</td>
              <td className="py-2 border-b">{dev.developerName}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(dev)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(dev.developerID)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default DevelopersPage;
