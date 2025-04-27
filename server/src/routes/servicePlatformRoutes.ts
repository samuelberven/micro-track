import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllServicePlatforms,
  getServicePlatformById,
  createServicePlatform,
} from "../controllers/servicePlatformController.js";

const router = express.Router();

export default function servicePlatformRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/serviceplatforms", getAllServicePlatforms(dbAdapter));
  router.get("/serviceplatforms/:id", getServicePlatformById(dbAdapter)); // Note: remember the '/' in "/:id"
  router.post("/serviceplatforms", createServicePlatform(dbAdapter)); // Note: remember the '/' in "/:id"
  return router;
}

// // old code
// import express from 'express';
// import {
//   getServicePlatforms,
//   createServicePlatform,
//   deleteServicePlatform,
// } from '../controllers/servicePlatformController.js';

// const router = express.Router();

// // READ
// router.get('/service-platforms', getServicePlatforms);

// // CREATE
// router.post('/add-service-platform-ajax', createServicePlatform);

// // DELETE
// router.delete('/delete-service-platform-ajax', deleteServicePlatform);

// export default router;
