import { Request, Response, RequestHandler } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { ServicePlatform } from "../types/ServicePlatform.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all ServicePlatforms route
export function getAllServicePlatforms(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<ServicePlatform>(
        "SELECT * FROM ServicePlatforms",
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching ServicePlatforms data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET ServicePlatform by ID route
export function getServicePlatformById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<ServicePlatform>(
        "SELECT * FROM ServicePlatforms WHERE servicePlatformID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res
          .status(404)
          .json({ error: "That particular ServicePlatform not found" });
      }
    } catch (error) {
      console.error("Error fetching ServicePlatform by ID, error", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) ServicePlatform route
export function createServicePlatform(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { platformName } = req.body;

      // Use `command` for INSERT operations with our custom InsertResult type
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO ServicePlatforms (platformName) VALUES (?)",
        [platformName],
      );

      res.status(201).json({
        message: "ServicePlatform created",
        id: result.insertId,
      });
    } catch (error: any) {
      // Use any (or unknown) to inspect the error details
      console.error("Error creating ServicePlatform:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) ServicePlatform (by ID) route
export function updateServicePlatform(
  dbAdapter: BaseMySQLAdapter,
): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { platformName } = req.body;

      // Ensure platformName is provided; note: this was causing errors, I think.
      if (platformName === undefined) {
        res.status(400).json({ error: "platformName is required" });
        return; // exit early
      }

      const result = await dbAdapter.command<{ affectedRows: number }>(
        "UPDATE ServicePlatforms SET platformName = ? WHERE servicePlatformID = ?",
        [platformName, id],
      );

      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "ServicePlatform updated successfully",
        });
      } else {
        res.status(404).json({ error: "ServicePlatform not found" });
      }
    } catch (error: any) {
      console.error("Error updating ServicePlatform:", error.message || error);
      res.status(500).json({ error: "Failed to update data" });
    }
  };
}

// DELETE ServicePlatform (by ID) route
export function deleteServicePlatform(
  dbAdapter: BaseMySQLAdapter,
): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Ensure that id parameter is provided
      if (!id) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }

      // Execute DELETE query; object containing affectedRows is expected
      const result = await dbAdapter.command<{ affectedRows: number }>(
        "DELETE FROM ServicePlatforms WHERE servicePlatformID = ?",
        [id],
      );

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "ServicePlatform deleted successfully" });
      } else {
        res.status(404).json({ error: "ServicePlatform not found" });
      }
    } catch (error: any) {
      console.error("Error deleting ServicePlatform:", error.message || error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  };
}
