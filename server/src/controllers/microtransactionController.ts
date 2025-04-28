import { Request, Response, RequestHandler } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { Microtransaction } from "../types/Microtransaction.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all Microtransactions
export function getAllMicrotransactions(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<Microtransaction>(
        "SELECT * FROM Microtransactions",
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Microtransactions data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET Microtransaction by ID
export function getMicrotransactionById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<Microtransaction>(
        "SELECT * FROM Microtransactions WHERE microtransactionID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "Microtransaction not found" });
      }
    } catch (error) {
      console.error("Error fetching Microtransaction by ID:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) Microtransaction
export function createMicrotransaction(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { gameID, price, description } = req.body;
      if ([gameID, price, description].some((field) => field === undefined)) {
        res
          .status(400)
          .json({ error: "gameID, price, and description are required" });
        return;
      }
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO Microtransactions (gameID, price, description) VALUES (?, ?, ?)",
        [gameID, price, description],
      );
      res
        .status(201)
        .json({ message: "Microtransaction created", id: result.insertId });
    } catch (error: any) {
      console.error("Error creating Microtransaction:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) Microtransaction (by ID)
export function updateMicrotransaction(
  dbAdapter: BaseMySQLAdapter,
): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { gameID, price, description } = req.body;
      if (description === undefined) {
        res.status(400).json({ error: "description is required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "UPDATE Microtransactions SET gameID = ?, price = ?, description = ? WHERE microtransactionID = ?",
        [gameID, price, description, id],
      );
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Microtransaction updated successfully" });
      } else {
        res.status(404).json({ error: "Microtransaction not found" });
      }
    } catch (error: any) {
      console.error("Error updating Microtransaction:", error.message || error);
      res.status(500).json({ error: "Failed to update data" });
    }
  };
}

// DELETE Microtransaction (by ID)
export function deleteMicrotransaction(
  dbAdapter: BaseMySQLAdapter,
): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "DELETE FROM Microtransactions WHERE microtransactionID = ?",
        [id],
      );
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Microtransaction deleted successfully" });
      } else {
        res.status(404).json({ error: "Microtransaction not found" });
      }
    } catch (error: any) {
      console.error("Error deleting Microtransaction:", error.message || error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  };
}
