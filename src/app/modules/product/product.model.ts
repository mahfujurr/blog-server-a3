import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

// src/models/warehouseModel.ts
const ProductSchema = new Schema<TProduct>({
  description: { type: String, required: true },
  HSCode: { type: String, required: true },
  units: { type: String, required: true },
  packing: { type: String, required: true },
  grade: { type: String, required: false },
  origin: { type: String, required: true },
}, {
  timestamps: true
});

export const Product = model<TProduct>("Product", ProductSchema);
