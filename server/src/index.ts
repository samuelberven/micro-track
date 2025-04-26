// Modular index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { LocalMySQLAdapter } from "./adapters/DatabaseAdapters.js";
import servicePlatformRoutes from "./routes/servicePlatformRoutes.js";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

// Enable CORS for all routes (use configuration options to restrict origins if desired)
app.use(cors());

const dbAdapter = new LocalMySQLAdapter();

async function initializeServer() {
  try {
    await dbAdapter.connect();
    console.log("Connected to MySQL database.");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1);
  }

  // Use servicePlatform routes
  app.use("/api", servicePlatformRoutes(dbAdapter));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

initializeServer();

// // Monolith index.ts to confirm backend-server connection works
// import { LocalMySQLAdapter } from './adapters/DatabaseAdapters.js';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();
// const port = process.env.SERVER_PORT || 3000;

// // Enable CORS for all routes (use configuration options to restrict origins if desired)
// app.use(cors());

// const dbAdapter = new LocalMySQLAdapter();

// async function initializeServer() {
//   try {
//     await dbAdapter.connect();
//     console.log('Connected to MySQL database.');
//   } catch (error) {
//     console.error('Failed to connect to MySQL:', error);
//     process.exit(1);
//   }

//   app.get('/serviceplatforms', async (req, res) => {
//     try {
//       const rows = await dbAdapter.query('SELECT * FROM ServicePlatforms');
//       res.json(rows);
//     } catch (error) {
//       console.error('Error fetching ServicePlatforms data:', error);
//       res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   });

//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

// initializeServer();
