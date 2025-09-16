// src/models/warehouseModel.ts
import mongoose, { Schema } from "mongoose";
import { TWarehouse } from "./warehouse.interface";


const warehouseSchema = new Schema<TWarehouse>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

export const WarehouseModel = mongoose.model<TWarehouse>("Warehouse", warehouseSchema);
