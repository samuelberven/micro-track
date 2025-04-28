// src/pages/Games.tsx
import React, { useState, useEffect } from "react";
import { Game } from "../types/Game";

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState({
    developerID: "",
    title: "",
    description: "",
    releaseDate: "",
  });
  const [editing, setEditing] = useState<Game | null>(null);

  // Function to fetch the list of Games
  const fetchGames = () => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data: Game[]) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Update form state when inputs change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or updating a game
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PATCH" : "POST";
    const url = editing ? `/api/games/${editing.gameID}` : "/api/games";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        developerID: Number(formData.developerID),
        title: formData.title,
        description: formData.description,
        releaseDate: formData.releaseDate,
      }),
    })
      .then(() => {
        fetchGames();
        setEditing(null);
        setFormData({
          developerID: "",
          title: "",
          description: "",
          releaseDate: "",
        });
      })
      .catch((err) => console.error("Error submitting form", err));
  };

  // Populate the form with an existing game for editing
  const handleEdit = (game: Game) => {
    setEditing(game);
    setFormData({
      developerID: game.developerID.toString(),
      title: game.title,
      description: game.description,
      // If releaseDate contains a time component, split it to get just "YYYY-MM-DD"
      releaseDate: game.releaseDate.split("T")[0],
    });
  };

  // Delete a game record
  const handleDelete = (gameID: number) => {
    fetch(`/api/games/${gameID}`, { method: "DELETE" })
      .then(() => fetchGames())
      .catch((err) => console.error("Error deleting game", err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Games</h2>
      {/* Create / Update Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        <div className="mb-4">
          <label className="block mb-1">Developer ID:</label>
          <input
            type="text"
            name="developerID"
            value={formData.developerID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editing ? "Update Game" : "Create Game"}
        </button>
      </form>
      {/* Table of Games */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Developer ID</th>
            <th className="py-2 border-b">Title</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.gameID} className="text-center">
              <td className="py-2 border-b">{game.gameID}</td>
              <td className="py-2 border-b">{game.developerID}</td>
              <td className="py-2 border-b">{game.title}</td>
              <td className="py-2 border-b">
                <button
                  onClick={() => handleEdit(game)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(game.gameID)}
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

export default GamesPage;
