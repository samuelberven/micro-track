import { Request, Response, RequestHandler } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { Customer } from "../types/Customer.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all Customers
export function getAllCustomers(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<Customer>("SELECT * FROM Customers");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching Customers data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET Customer by ID
export function getCustomerById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<Customer>(
        "SELECT * FROM Customers WHERE customerID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      console.error("Error fetching Customer by ID:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) Customer
export function createCustomer(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { servicePlatformID, username, email } = req.body;
      if (
        [servicePlatformID, username, email].some(
          (field) => field === undefined,
        )
      ) {
        res.status(400).json({ error: "All customer fields are required" });
        return;
      }
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO Customers (servicePlatformID, username, email) VALUES (?, ?, ?)",
        [servicePlatformID, username, email],
      );
      res
        .status(201)
        .json({ message: "Customer created", id: result.insertId });
    } catch (error: any) {
      console.error("Error creating Customer:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) Customer (by ID)
export function updateCustomer(dbAdapter: BaseMySQLAdapter): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { servicePlatformID, username, email } = req.body;
      if (username === undefined) {
        res.status(400).json({ error: "username is required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "UPDATE Customers SET servicePlatformID = ?, username = ?, email = ? WHERE customerID = ?",
        [servicePlatformID, username, email, id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Customer updated successfully" });
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error: any) {
      console.error("Error updating Customer:", error.message || error);
      res.status(500).json({ error: "Failed to update data" });
    }
  };
}

// DELETE Customer (by ID)
export function deleteCustomer(dbAdapter: BaseMySQLAdapter): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "DELETE FROM Customers WHERE customerID = ?",
        [id],
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Customer deleted successfully" });
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error: any) {
      console.error("Error deleting Customer:", error.message || error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  };
}
