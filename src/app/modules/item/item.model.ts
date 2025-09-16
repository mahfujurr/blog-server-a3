// src/models/categoryModel.ts
import mongoose, { Schema } from "mongoose";
import { TCategory } from "./item.interface";


const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
  items: { type: [String], default: [] },
});

export const CategoryModel = mongoose.model<TCategory>("Category", categorySchema);