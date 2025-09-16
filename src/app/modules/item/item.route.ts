// src/routes/categoryRoutes.ts
import express from "express";
import { categoryController } from "./ item.controller";


const router = express.Router();

// Get all categories
router.get("/", categoryController.getAllCategories);

// Add or update a category
router.post("/", categoryController.createCategory);

// Update a specific category
router.patch("/:name", categoryController.updateCategory);

// Delete a specific category
router.delete("/:name", categoryController.deleteCategory);


export const ItemRoutes = router;