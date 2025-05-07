import express from "express";
import { getAllPurchases, getPurchaseById, createPurchase, updatePurchase, deletePurchase, } from "../controllers/purchaseController.js";
const router = express.Router();
export default function purchasesRoutes(dbAdapter) {
    router.get("/purchases", getAllPurchases(dbAdapter));
    router.get("/purchases/:id", getPurchaseById(dbAdapter));
    router.post("/purchases", createPurchase(dbAdapter));
    router.patch("/purchases/:id", updatePurchase(dbAdapter));
    router.delete("/purchases/:id", deletePurchase(dbAdapter));
    return router;
}
