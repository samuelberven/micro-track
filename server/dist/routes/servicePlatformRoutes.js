import express from "express";
import { getAllServicePlatforms, getServicePlatformById, createServicePlatform, updateServicePlatform, deleteServicePlatform, } from "../controllers/servicePlatformController.js";
const router = express.Router();
export default function servicePlatformRoutes(dbAdapter) {
    router.get("/serviceplatforms", getAllServicePlatforms(dbAdapter));
    router.get("/serviceplatforms/:id", getServicePlatformById(dbAdapter)); // Note: remember the '/' in "/:id"
    // POST route to create a new ServicePlatform
    router.post("/serviceplatforms", createServicePlatform(dbAdapter));
    router.patch("/serviceplatforms/:id", updateServicePlatform(dbAdapter));
    // DELETE route to delete a ServicePlatform by ID
    router.delete("/serviceplatforms/:id", deleteServicePlatform(dbAdapter));
    return router;
}
