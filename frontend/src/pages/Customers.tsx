import React, { useState, useEffect, useMemo } from 'react';
import { Customer } from '../types/Customer';
import { ServicePlatform } from '../types/ServicePlatform';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService';
import { getServicePlatforms } from '../services/servicePlatformsService.ts';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [servicePlatforms, setServicePlatforms] = useState<ServicePlatform[]>([]);
  const [formData, setFormData] = useState({
    servicePlatformID: '', // Will be set via dropdown
    username: '',
    email: '',
  });
  const [editing, setEditing] = useState<Customer | null>(null);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  // Fetch service platforms from the API
  const fetchServicePlatforms = async () => {
    try {
      const platforms = await getServicePlatforms();
      setServicePlatforms(platforms);
    } catch (err) {
      console.error("Error fetching service platforms:", err);
    }
  };

  // On component mount, fetch both customers and service platforms
  useEffect(() => {
    fetchCustomers();
    fetchServicePlatforms();
  }, []);

  // Build a mapping (servicePlatformID -> platformName) for quick lookup in the table
  const platformMapping = useMemo(() => {
    const map: Record<number, string> = {};
    servicePlatforms.forEach((sp) => {
      map[sp.servicePlatformID] = sp.platformName;
    });
    return map;
  }, [servicePlatforms]);

  // Update form state when inputs change.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create/update form submission with confirmation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this customer?`)) return;

    const payload = {
      servicePlatformID: Number(formData.servicePlatformID),
      username: formData.username,
      email: formData.email,
    };

    try {
      if (editing) {
        await updateCustomer(editing.customerID, payload);
      } else {
        await createCustomer(payload);
      }
      await fetchCustomers();
      setEditing(null);
      setFormData({ servicePlatformID: '', username: '', email: '' });
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // Prepopulate the form fields for editing
  const handleEdit = (customer: Customer) => {
    setEditing(customer);
    setFormData({
      servicePlatformID: customer.servicePlatformID.toString(),
      username: customer.username,
      email: customer.email,
    });
  };

  // Handle deletion with a confirmation prompt
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await deleteCustomer(id);
      await fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      {/* Create/Update Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        {/* Service Platform selection via dropdown */}
        <div className="mb-4">
          <label className="block mb-1">Service Platform:</label>
          <select
            name="servicePlatformID"
            value={formData.servicePlatformID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Service Platform</option>
            {servicePlatforms.map((sp) => (
              <option key={sp.servicePlatformID} value={sp.servicePlatformID}>
                {sp.platformName}
              </option>
            ))}
          </select>
        </div>
        {/* Username Field */}
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
        {/* Email Field */}
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
          {editing ? "Update Customer" : "Create Customer"}
        </button>
      </form>

      {/* Table of Customers */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Service Platform</th>
            <th className="py-2 border-b">Username</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.customerID} className="text-center">
              <td className="py-2 border-b">{cust.customerID}</td>
              <td className="py-2 border-b">
                {platformMapping[cust.servicePlatformID] || cust.servicePlatformID}
              </td>
              <td className="py-2 border-b">{cust.username}</td>
              <td className="py-2 border-b">{cust.email}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEdit(cust)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(cust.customerID)} className="bg-red-500 text-white px-2 py-1 rounded">
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
