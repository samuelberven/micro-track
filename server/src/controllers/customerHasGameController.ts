import { Request, Response, RequestHandler } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { CustomerHasGame } from "../types/CustomerHasGame.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all records
export function getAllCustomersHaveGames(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<CustomerHasGame>(
        "SELECT * FROM CustomersHaveGames",
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching CustomersHaveGames data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET record by ID
export function getCustomersHaveGameById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<CustomerHasGame>(
        "SELECT * FROM CustomersHaveGames WHERE customersHaveGamesID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      console.error("Error fetching record by ID:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) record
export function createCustomersHaveGame(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { customerID, gameID, installDate } = req.body;
      if ([customerID, gameID].some((field) => field === undefined)) {
        res.status(400).json({ error: "customerID and gameID are required" });
        return;
      }
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO CustomersHaveGames (customerID, gameID, installDate) VALUES (?, ?, ?)",
        [customerID, gameID, installDate || null],
      );
      res.status(201).json({ message: "Record created", id: result.insertId });
    } catch (error: any) {
      console.error("Error creating record:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) record
export function updateCustomersHaveGame(
  dbAdapter: BaseMySQLAdapter,
): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { customerID, gameID, installDate } = req.body;
      if (customerID === undefined || gameID === undefined) {
        res.status(400).json({ error: "customerID and gameID are required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "UPDATE CustomersHaveGames SET customerID = ?, gameID = ?, installDate = ? WHERE customersHaveGamesID = ?",
        [customerID, gameID, installDate || null, id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error: any) {
      console.error("Error updating record:", error.message || error);
      res.status(500).json({ error: "Failed to update data" });
    }
  };
}

// DELETE record
export function deleteCustomersHaveGame(
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
        "DELETE FROM CustomersHaveGames WHERE customersHaveGamesID = ?",
        [id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error: any) {
      console.error("Error deleting record:", error.message || error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  };
}
