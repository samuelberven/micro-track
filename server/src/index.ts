// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import servicePlatformRoutes from './routes/servicePlatformRoutes.js';

// const app = express();

// dotenv.config({ path: '.env.server' });

// // Tests that env vars are loaded correctly
// console.log('Environment Variables:', {
//   MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
//   MYSQL_DATABASE: process.env.MYSQL_DATABASE,
//   MYSQL_USER: process.env.MYSQL_USER,
//   MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
//   ENV_MODE: process.env.ENV_MODE,
// });


// // CORS configuration to allow all origins
// app.use(cors({ // Todo: implement local:host:3000 for development and Azure for production
//     origin: true,
//     methods: 'GET,POST,PUT,DELETE,OPTIONS',
//     credentials: true,
//   }));
// // Todo: implement JWT, etc., authentication/authorization middleware here WHEN I implement user login


// app.use(express.json()); // Enable JSON parsing for incoming requests

// app.use('/api', servicePlatformRoutes);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// console.log("TypeScript is working!");


// Dummy index.ts just to confirm that the backend-server connection works 
import { LocalMySQLAdapter } from './adapters/DatabaseAdapters.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
  

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

// Enable CORS for all routes (use configuration options to restrict origins if desired)
app.use(cors());

const dbAdapter = new LocalMySQLAdapter();

async function initializeServer() {
  try {
    await dbAdapter.connect();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
    process.exit(1);
  }

  app.get('/serviceplatforms', async (req, res) => {
    try {
      const rows = await dbAdapter.query('SELECT * FROM ServicePlatforms');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching ServicePlatforms data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

initializeServer();