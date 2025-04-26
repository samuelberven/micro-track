import { Request, Response } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { ServicePlatform } from "../types/ServicePlatform.js";

// Pass the dbAdapter instance from outside
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

// // Old code:

// import { Request, Response } from 'express';
// import mysql, { RowDataPacket } from 'mysql2/promise';
// import { ServicePlatform } from '../types/ServicePlatform.js';

// // Database connection setup (replace with your adapter pattern logic)
// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'dev_db',
// };

// export const getServicePlatforms = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const db = await mysql.createConnection(dbConfig);
//     const query = 'SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;';
//     const [rows] = await db.execute<RowDataPacket[]>(query);

//     // Map RowDataPacket[] to ServicePlatform[] (Note: RowDataPacket returns are a quirk of mysql2)
//     // TODO: Refactor this to DRY for both adapters
//     const servicePlatforms: ServicePlatform[] = rows.map(row => ({
//         servicePlatformID: row.servicePlatformID,
//         platformName: row.platformName,
//     }));

//     await db.end();
//     res.status(200).json(servicePlatforms);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching service platforms.');
//   }
// };

// export const createServicePlatform = async (req: Request, res: Response): Promise<void> => {
//   const { platformName } = req.body;
//   if (!platformName) {
//     res.status(400).send('Platform name is required.');
//     return;
//   }

//   try {
//     const db = await mysql.createConnection(dbConfig);
//     const insertQuery = 'INSERT INTO ServicePlatforms (platformName) VALUES (?);';
//     await db.execute(insertQuery, [platformName]);

//     const selectQuery = 'SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;';
//     const [rows] = await db.execute<RowDataPacket[]>(selectQuery);

//     // Map RowDataPacket[] to ServicePlatform[] (Note: RowDataPacket returns are a quirk of mysql2)
//     // TODO: Refactor this to DRY for both adapters
//     const servicePlatforms: ServicePlatform[] = rows.map(row => ({
//         servicePlatformID: row.servicePlatformID,
//         platformName: row.platformName,
//     }));

//     await db.end();
//     res.status(200).json(servicePlatforms);

// } catch (error) {
//     console.error('Error details:', error);
//     // console.error(error);
//     res.status(500).send('Error creating service platform.');
//   }
// };

// export const deleteServicePlatform = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.body;
//   const servicePlatformID = parseInt(id, 10);

//   if (isNaN(servicePlatformID)) {
//     res.status(400).send('Invalid service platform ID.');
//     return;
//   }

//   try {
//     const db = await mysql.createConnection(dbConfig);
//     const deleteQuery = 'DELETE FROM ServicePlatforms WHERE servicePlatformID = ?;';
//     await db.execute(deleteQuery, [servicePlatformID]);
//     await db.end();
//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error deleting service platform.');
//   }
// };
