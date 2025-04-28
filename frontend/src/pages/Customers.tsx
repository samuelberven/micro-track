import React, { useState, useEffect } from 'react';
import { Customer } from '../types/Customer';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState({
    servicePlatformID: '',
    username: '',
    email: ''
  });
  const [editing, setEditing] = useState<Customer | null>(null);

  const fetchCustomers = () => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then(setCustomers)
      .catch(console.error);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing ? `/api/customers/${editing.customerID}` : '/api/customers';
    const body = {
      ...formData,
      servicePlatformID: Number(formData.servicePlatformID)
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        fetchCustomers();
        setEditing(null);
        setFormData({ servicePlatformID: '', username: '', email: '' });
      })
      .catch(console.error);
  };

  const handleEdit = (customer: Customer) => {
    setEditing(customer);
    setFormData({
      servicePlatformID: customer.servicePlatformID.toString(),
      username: customer.username,
      email: customer.email,
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/customers/${id}`, { method: 'DELETE' })
      .then(fetchCustomers)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Service Platform ID:</label>
          <input
            type="text"
            name="servicePlatformID"
            value={formData.servicePlatformID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? 'Update Customer' : 'Create Customer'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Service Platform ID</th>
            <th className="py-2 border-b">Username</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customerID} className="text-center">
              <td className="py-2 border-b">{c.customerID}</td>
              <td className="py-2 border-b">{c.servicePlatformID}</td>
              <td className="py-2 border-b">{c.username}</td>
              <td className="py-2 border-b">{c.email}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(c)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(c.customerID)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default CustomersPage;
