import React, { useState, useEffect, useMemo } from "react";
import { Game } from "../types/Game";
import { getGames, createGame, updateGame, deleteGame } from "../services/gamesService";
import { getDevelopers } from "../services/developersService";
import { Developer } from "../types/Developer";


// Note: developerID dropdown shows associated developer name
const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [formData, setFormData] = useState({
    developerID: "",
    title: "",
    description: "",
    releaseDate: "",
  });
  const [editing, setEditing] = useState<Game | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Fetch games from the API
  const fetchGames = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  // Fetch developers from the API
  const fetchDevelopers = async () => {
    try {
      const devs = await getDevelopers();
      setDevelopers(devs);
    } catch (err) {
      console.error("Error fetching developers:", err);
    }
  };

  // On component mount, fetch both games and developers
  useEffect(() => {
    fetchGames();
    fetchDevelopers();
  }, []);

  // Build a mapping (developerID -> developerName) for quick lookup in the table
  // Note: I need to use cache here instead to avoid re-calculating the mapping on every render
  const developerMapping = useMemo(() => {
    const map: Record<number, string> = {};
    developers.forEach((dev) => {
      map[dev.developerID] = dev.developerName;
    });
    return map;
  }, [developers]);

  // Update form state when inputs change.
  // This will be used for both text inputs and the select dropdown.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create/update form submission with confirmation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this game?`)) return;

    const payload = {
      developerID: Number(formData.developerID), // Convert selected value to number
      title: formData.title,
      description: formData.description,
      releaseDate: formData.releaseDate,
    };

    try {
      if (editing) {
        await updateGame(editing.gameID, payload);
      } else {
        await createGame(payload);
      }
      await fetchGames();
      setEditing(null);
      setFormData({ developerID: "", title: "", description: "", releaseDate: "" });
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // Prepopulate the form fields (including the dropdown) for editing
  const handleEdit = (game: Game) => {
    setEditing(game);
    setFormData({
      developerID: game.developerID.toString(),
      title: game.title,
      description: game.description,
      releaseDate: game.releaseDate.split("T")[0],
    });
  };

  // Handle deletion with a confirmation prompt
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      await deleteGame(id);
      await fetchGames();
    } catch (err) {
      console.error("Error deleting game", err);
    }
  };

  // Toggle the display of extra details (description and release date)
  const toggleExpand = (gameID: number) => {
    if (expandedRows.includes(gameID)) {
      setExpandedRows(expandedRows.filter((id) => id !== gameID));
    } else {
      setExpandedRows([...expandedRows, gameID]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Games</h2>
      {/* Create/Update Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        {/* Developer selection via dropdown */}
        <div className="mb-4">
          <label className="block mb-1">Developer:</label>
          <select
            name="developerID"
            value={formData.developerID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Developer</option>
            {developers.map((dev) => (
              <option key={dev.developerID} value={dev.developerID}>
                {dev.developerName}
              </option>
            ))}
          </select>
        </div>
        {/* Title Field */}
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
        {/* Description Field */}
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
        {/* Release Date Field */}
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
            {/* Game ID column is omitted */}
            <th className="py-2 border-b">Developer</th>
            <th className="py-2 border-b">Title</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <React.Fragment key={game.gameID}>
              <tr className="text-center">
                <td className="py-2 border-b">
                  {developerMapping[game.developerID] || game.developerID}
                </td>
                <td className="py-2 border-b">{game.title}</td>
                <td className="py-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(game.gameID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleExpand(game.gameID)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    {expandedRows.includes(game.gameID) ? "Less" : "More"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(game.gameID) && (
                <tr className="bg-gray-50">
                  <td className="py-2 border-b text-left px-4" colSpan={3}>
                    <div>
                      <strong>Description:</strong> {game.description}
                    </div>
                    <div>
                      <strong>Release Date:</strong>{" "}
                      {new Date(game.releaseDate).toLocaleDateString()}
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

export default GamesPage;
