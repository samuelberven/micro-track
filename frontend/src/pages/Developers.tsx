// Note: everything works except Create

import React, { useState, useEffect } from "react";
import { Developer } from "../types/Developer";
import {
  getDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from "../services/developersService";

const DevelopersPage: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [formData, setFormData] = useState({
    developerName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    contact: "",
  });
  const [editing, setEditing] = useState<Developer | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Fetch developers from API
  const fetchDevelopers = async () => {
    try {
      const data = await getDevelopers();
      setDevelopers(data);
    } catch (err) {
      console.error("Error fetching developers:", err);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  // Update form state when an input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create/update form submission with a confirmation prompt to the user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this developer?`)) {
      return;
    }

    // Build the payload converting zipCode from string to number
    // Note: Need to add auto-fill (entering zipCode auotfills city and state)
    // Note: Need to add email validation, and type checking for contact info; probably should add these as a util for use througout the app
    const payload = {
      ...formData,
      zipCode: Number(formData.zipCode),
    };

    try {
      if (editing) {
        await updateDeveloper(editing.developerID, payload);
      } else {
        const newDeveloper = await createDeveloper(payload);
        console.log("Created new developer:", newDeveloper);
      }
      await fetchDevelopers();
      setEditing(null);
      setFormData({
        developerName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        contact: "",
      });
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // When editing, pre-populate the form fields with the developer's data
  const handleEdit = (dev: Developer) => {
    setEditing(dev);
    setFormData({
      developerName: dev.developerName,
      address: dev.address,
      city: dev.city,
      state: dev.state,
      zipCode: dev.zipCode.toString(),
      email: dev.email,
      contact: dev.contact,
    });
  };

  // Handle deletion with confirmation prompt
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this developer?")) {
      return;
    }
    try {
      await deleteDeveloper(id);
      await fetchDevelopers();
    } catch (err) {
      console.error("Error deleting developer", err);
    }
  };

  // Toggle the expanded row for additional details
  const toggleExpand = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((x) => x !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Developers</h2>
      {/* Create/Update Form */}
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
              maxLength={2}
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
          {editing ? "Update Developer" : "Create Developer"}
        </button>
      </form>

      {/* Developers Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {/* Hiding Developer ID column */}
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev) => (
            <React.Fragment key={dev.developerID}>
              <tr className="text-center">
                <td className="py-2 border-b">{dev.developerName}</td>
                <td className="py-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(dev)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dev.developerID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleExpand(dev.developerID)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    {expandedRows.includes(dev.developerID) ? "Less" : "More"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(dev.developerID) && (
                <tr className="bg-gray-50">
                  <td className="py-2 border-b text-left px-4" colSpan={2}>
                    <div>
                      <strong>Address:</strong> {dev.address}
                    </div>
                    <div>
                      <strong>City:</strong> {dev.city}, <strong>State:</strong> {dev.state}{" "}
                      <strong>ZIP:</strong> {dev.zipCode}
                    </div>
                    <div>
                      <strong>Email:</strong> {dev.email}
                    </div>
                    <div>
                      <strong>Contact:</strong> {dev.contact}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevelopersPage;
