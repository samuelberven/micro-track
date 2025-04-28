import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllCustomersHaveGames,
  getCustomersHaveGameById,
  createCustomersHaveGame,
  updateCustomersHaveGame,
  deleteCustomersHaveGame,
} from "../controllers/customerHasGameController.js";

const router = express.Router();

export default function customersHaveGamesRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/customershavegames", getAllCustomersHaveGames(dbAdapter));
  router.get("/customershavegames/:id", getCustomersHaveGameById(dbAdapter));
  router.post("/customershavegames", createCustomersHaveGame(dbAdapter));
  router.patch("/customershavegames/:id", updateCustomersHaveGame(dbAdapter));
  router.delete("/customershavegames/:id", deleteCustomersHaveGame(dbAdapter));
  return router;
}
