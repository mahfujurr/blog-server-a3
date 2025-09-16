import express from "express";
import { receiptController } from "./ receipt.controller";


const router = express.Router();

router.get("/", receiptController.getAllReceipts);
router.get("/:id", receiptController.getSingleReceipt);
router.post("/", receiptController.createReceipt);
router.patch("/:id", receiptController.updateReceipt);
router.delete("/:id", receiptController.deleteReceipt);

export const ReceiptRoutes = router;
