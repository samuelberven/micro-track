import express from "express";
import developersRouter from "./developersRoutes.js"; // Import developers routes

const router = express.Router();

// Prefix all developer routes with /api/developers
router.use("/developers", developersRouter);

// Export the main router
export default router;