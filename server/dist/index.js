import express from 'express';
import cors from 'cors';
import servicePlatformRoutes from './routes/servicePlatformRoutes.js';
const app = express();
// CORS configuration to allow all origins
app.use(cors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
}));
// Todo: implement JWT, etc., authentication/authorization middleware here WHEN I implement user login
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use('/api', servicePlatformRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// console.log("TypeScript is working!");
