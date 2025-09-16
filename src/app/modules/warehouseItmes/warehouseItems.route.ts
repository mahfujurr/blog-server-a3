// src/routes/warehouseRoutes.ts
import express from "express";
import { warehouseItemController } from "./ warehouseItems.controller";



const router = express.Router();

router.get("/", warehouseItemController.getAllWarehouseItems);
// router.post("/bulk-add", warehouseItemController.addMultipleWarehouseItems);
router.post("/", warehouseItemController.createWarehouseItem);
router.patch("/bulk-deduct", warehouseItemController.bulkDeductWarehouseItems);
router.patch("/:id", warehouseItemController.updateWarehouseItem);
router.delete("/:id", warehouseItemController.deleteWarehouseItem);
// 🕓 Purchase history routes
router.get("/purchase-history", warehouseItemController.getAllPurchaseHistory);
router.get("/purchase-history/:id", warehouseItemController.getSinglePurchaseHistory);
router.post("/purchase-history", warehouseItemController.createPurchaseHistory);
router.patch('/purchase-history/:id', warehouseItemController.updatePurchaseHistory);
router.delete("/purchase-history/:id", warehouseItemController.deletePurchaseHistory);

export const WarehouseItemRoutes = router;