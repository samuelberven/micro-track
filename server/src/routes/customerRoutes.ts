import express from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

export default function customersRoutes(dbAdapter: BaseMySQLAdapter) {
  router.get("/customers", getAllCustomers(dbAdapter));
  router.get("/customers/:id", getCustomerById(dbAdapter));
  router.post("/customers", createCustomer(dbAdapter));
  router.patch("/customers/:id", updateCustomer(dbAdapter));
  router.delete("/customers/:id", deleteCustomer(dbAdapter));
  return router;
}
