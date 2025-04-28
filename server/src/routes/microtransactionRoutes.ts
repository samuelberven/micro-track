import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllMicrotransactions,
  getMicrotransactionById,
  createMicrotransaction,
  updateMicrotransaction,
  deleteMicrotransaction,
} from "../controllers/microtransactionController.js";

const router = express.Router();

export default function microtransactionsRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/microtransactions", getAllMicrotransactions(dbAdapter));
  router.get("/microtransactions/:id", getMicrotransactionById(dbAdapter));
  router.post("/microtransactions", createMicrotransaction(dbAdapter));
  router.patch("/microtransactions/:id", updateMicrotransaction(dbAdapter));
  router.delete("/microtransactions/:id", deleteMicrotransaction(dbAdapter));
  return router;
}
