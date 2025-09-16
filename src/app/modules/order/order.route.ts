import express from "express";
import { orderController } from "./ order.controller";


const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.get("/:id", orderController.getSingleOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export const OrderRoutes = router;
