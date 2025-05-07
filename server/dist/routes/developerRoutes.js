import express from "express";
import { getAllDevelopers, getDeveloperById, createDeveloper, updateDeveloper, deleteDeveloper, } from "../controllers/developerController.js";
const router = express.Router();
export default function developersRoutes(dbAdapter) {
    router.get("/developers", getAllDevelopers(dbAdapter));
    router.get("/developers/:id", getDeveloperById(dbAdapter));
    router.post("/developers", createDeveloper(dbAdapter));
    router.patch("/developers/:id", updateDeveloper(dbAdapter));
    router.delete("/developers/:id", deleteDeveloper(dbAdapter));
    return router;
}
