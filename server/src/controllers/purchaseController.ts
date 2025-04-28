import { Request, Response, RequestHandler } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { Purchase } from "../types/Purchase.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all Purchases
export function getAllPurchases(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<Purchase>("SELECT * FROM Purchases");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Purchases data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET Purchase by ID
export function getPurchaseById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<Purchase>(
        "SELECT * FROM Purchases WHERE purchaseID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "Purchase not found" });
      }
    } catch (error) {
      console.error("Error fetching Purchase by ID:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) Purchase
export function createPurchase(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { customerID, microtransactionID, date } = req.body;
      // microtransactionID and date are required; customerID is allowed to be null.
      if ([microtransactionID, date].some((field) => field === undefined)) {
        res
          .status(400)
          .json({ error: "microtransactionID and date are required" });
        return;
      }
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO Purchases (customerID, microtransactionID, date) VALUES (?, ?, ?)",
        [customerID || null, microtransactionID, date],
      );
      res
        .status(201)
        .json({ message: "Purchase created", id: result.insertId });
    } catch (error: any) {
      console.error("Error creating Purchase:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) Purchase (by ID)
export function updatePurchase(dbAdapter: BaseMySQLAdapter): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { customerID, microtransactionID, date } = req.body;
      if (microtransactionID === undefined || date === undefined) {
        res
          .status(400)
          .json({ error: "microtransactionID and date are required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "UPDATE Purchases SET customerID = ?, microtransactionID = ?, date = ? WHERE purchaseID = ?",
        [customerID || null, microtransactionID, date, id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Purchase updated successfully" });
      } else {
        res.status(404).json({ error: "Purchase not found" });
      }
    } catch (error: any) {
      console.error("Error updating Purchase:", error.message || error);
      res.status(500).json({ error: "Failed to update data" });
    }
  };
}

// DELETE Purchase (by ID)
export function deletePurchase(dbAdapter: BaseMySQLAdapter): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "DELETE FROM Purchases WHERE purchaseID = ?",
        [id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Purchase deleted successfully" });
      } else {
        res.status(404).json({ error: "Purchase not found" });
      }
    } catch (error: any) {
      console.error("Error deleting Purchase:", error.message || error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  };
}
