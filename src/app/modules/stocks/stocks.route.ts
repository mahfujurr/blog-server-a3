import express from "express";
import { StockController } from "./ stocks.controller";


const router = express.Router();

router.post("/", StockController.createStock);
router.get("/", StockController.getAllStocks);
router.get("/:id", StockController.getSingleStock);
router.patch("/:id", StockController.updateStock);
router.delete("/:id", StockController.deleteStock);

export const StockRoutes = router;
