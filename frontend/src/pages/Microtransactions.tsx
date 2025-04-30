import React, { useState, useEffect } from "react";
import { Microtransaction } from "../types/Microtransaction";
import { getMicrotransactions, createMicrotransaction, updateMicrotransaction, deleteMicrotransaction } from "../services/microtransactionsService";
import { Game } from "../types/Game";
import { getGames } from "../services/gamesService";

const MicrotransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Microtransaction[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState({
    gameID: "",
    price: "",
    description: ""
  });
  const [editing, setEditing] = useState<Microtransaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const data = await getMicrotransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching microtransactions:", err);
    }
  };

  const fetchGames = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchGames();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = editing ? "update" : "create";
    if (!window.confirm(`Are you sure you want to ${actionMsg} this microtransaction?`))
      return;

    const payload = {
      gameID: Number(formData.gameID),
      price: Number(formData.price),
      description: formData.description
    };

    try {
      if (editing) {
        await updateMicrotransaction(editing.microtransactionID, payload);
      } else {
        await createMicrotransaction(payload);
      }
      await fetchTransactions();
      setEditing(null);
      setFormData({ gameID: "", price: "", description: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (tx: Microtransaction) => {
    setEditing(tx);
    setFormData({
      gameID: tx.gameID.toString(),
      price: tx.price.toString(),
      description: tx.description
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this microtransaction?"))
      return;
    try {
      await deleteMicrotransaction(id);
      await fetchTransactions();
    } catch (err) {
      console.error("Error deleting microtransaction:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Microtransactions</h2>
      
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded mb-8">
        {/* Dropdown for Game */}
        <div className="mb-4">
          <label className="block mb-1">Game:</label>
          <select
            name="gameID"
            value={formData.gameID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Game</option>
            {games.map((game) => (
              <option key={game.gameID} value={game.gameID}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
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
          {editing ? "Update Microtransaction" : "Create Microtransaction"}
        </button>
      </form>
      
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">ID</th>
            <th className="py-2 border-b">Game</th>
            <th className="py-2 border-b">Price</th>
            <th className="py-2 border-b">Description</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.microtransactionID} className="text-center">
              <td className="py-2 border-b">{tx.microtransactionID}</td>
              <td className="py-2 border-b">
                {(() => {
                  const game = games.find((g) => g.gameID === tx.gameID);
                  return game ? game.title : tx.gameID;
                })()}
              </td>
              <td className="py-2 border-b">{tx.price}</td>
              <td className="py-2 border-b">{tx.description}</td>
              <td className="py-2 border-b space-x-2">
                <button onClick={() => handleEdit(tx)} className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(tx.microtransactionID)} className="bg-red-500 text-white px-2 py-1 rounded">
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
