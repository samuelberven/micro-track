import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";

const router = express.Router();

export default function gamesRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/games", getAllGames(dbAdapter));
  router.get("/games/:id", getGameById(dbAdapter));
  router.post("/games", createGame(dbAdapter));
  router.patch("/games/:id", updateGame(dbAdapter));
  router.delete("/games/:id", deleteGame(dbAdapter));
  return router;
}
