import React, { useState, useEffect } from 'react';
import { ServicePlatform } from '../types/ServicePlatform';

const ServicePlatformsPage = () => {
  const [platforms, setPlatforms] = useState<ServicePlatform[]>([]);
  const [platformName, setPlatformName] = useState('');
  const [editing, setEditing] = useState<ServicePlatform | null>(null);

  const fetchPlatforms = () => {
    fetch('/api/service-platforms')
      .then((res) => res.json())
      .then(setPlatforms)
      .catch(console.error);
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const url = editing
      ? `/api/service-platforms/${editing.servicePlatformID}`
      : '/api/service-platforms';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platformName }),
    })
      .then(() => {
        fetchPlatforms();
        setEditing(null);
        setPlatformName('');
      })
      .catch(console.error);
  };

  const handleEdit = (platform: ServicePlatform) => {
    setEditing(platform);
    setPlatformName(platform.platformName);
  };

  const handleDelete = (id: number) => {
    fetch(`/api/service-platforms/${id}`, { method: 'DELETE' })
      .then(fetchPlatforms)
      .catch(console.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Service Platforms</h2>
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
          {editing ? 'Update Platform' : 'Create Platform'}
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Platform Name</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (
            <tr key={platform.servicePlatformID} className="text-center">
              <td className="py-2 border-b">{platform.servicePlatformID}</td>
              <td className="py-2 border-b">{platform.platformName}</td>
              <td className="py-2 border-b">
                <button
                  onClick={() => handleEdit(platform)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(platform.servicePlatformID)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
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

export default ServicePlatformsPage;
