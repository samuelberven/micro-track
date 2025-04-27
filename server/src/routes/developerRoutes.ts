import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from "../controllers/developerController.js";

const router = express.Router();

export default function developersRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/developers", getAllDevelopers(dbAdapter));
  router.get("/developers/:id", getDeveloperById(dbAdapter));
  router.post("/developers", createDeveloper(dbAdapter));
  router.patch("/developers/:id", updateDeveloper(dbAdapter));
  router.delete("/developers/:id", deleteDeveloper(dbAdapter));
  return router;
}
