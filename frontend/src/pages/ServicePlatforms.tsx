import React, { useState, useEffect } from "react";
import { ServicePlatform } from "../types/ServicePlatform";
import {
  getServicePlatforms,
  createServicePlatform,
  updateServicePlatform,
  deleteServicePlatform,
} from "../services/servicePlatformsService";

const ServicePlatformsPage: React.FC = () => {
  const [platforms, setPlatforms] = useState<ServicePlatform[]>([]);
  const [platformName, setPlatformName] = useState("");
  const [editing, setEditing] = useState<ServicePlatform | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Fetch the list of platforms from the API
  const fetchPlatforms = async () => {
    try {
      const data = await getServicePlatforms();
      setPlatforms(data);
    } catch (err) {
      console.error("Error fetching platforms:", err);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  // Handle form submission for create/update with confirmation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this platform?`))
      return;

    try {
      if (editing) {
        await updateServicePlatform(editing.servicePlatformID, { platformName });
      } else {
        await createServicePlatform({ platformName });
      }
      await fetchPlatforms();
      setEditing(null);
      setPlatformName("");
    } catch (err) {
      console.error(`Error ${actionMsg} platform:`, err);
    }
  };

  // Prepopulate the form for editing an existing platform
  const handleEdit = (platform: ServicePlatform) => {
    setEditing(platform);
    setPlatformName(platform.platformName);
  };

  // Handle deletion with confirmation
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this platform?"))
      return;
    try {
      await deleteServicePlatform(id);
      await fetchPlatforms();
    } catch (err) {
      console.error("Error deleting platform:", err);
    }
  };

  // Toggle the expandable row for more details
  const toggleExpand = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Service Platforms</h2>
      {/* Create/Update Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Platform Name:</label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? "Update Platform" : "Create Platform"}
        </button>
      </form>

      {/* Table of Platforms */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {/* In this example, we’re not displaying the auto-generated ID */}
            <th className="py-2 border-b">Platform Name</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (
            <React.Fragment key={platform.servicePlatformID}>
              <tr className="text-center">
                <td className="py-2 border-b">{platform.platformName}</td>
                <td className="py-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(platform)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(platform.servicePlatformID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleExpand(platform.servicePlatformID)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    {expandedRows.includes(platform.servicePlatformID)
                      ? "Less"
                      : "More"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(platform.servicePlatformID) && (
                <tr className="bg-gray-50">
                  <td className="py-2 border-b text-left px-4" colSpan={2}>
                    <div>
                      <strong>Platform Name:</strong> {platform.platformName}
                    </div>
                    {/* Future extra details can be added here */}
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

export default ServicePlatformsPage;
