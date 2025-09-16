// src/routes/warehouseRoutes.ts
import express from "express";
import { warehouseController } from "./ warehouse.controller";


const router = express.Router();

router.get("/", warehouseController.getAllWarehouses);
router.post("/", warehouseController.createWarehouse);
router.patch("/:id", warehouseController.updateWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

export const WarehouseRoutes = router;