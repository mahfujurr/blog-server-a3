import { Schema, model } from "mongoose";
import { TStock } from "./stocks.interface";


const stockSchema = new Schema<TStock>(
  {
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    itemDescription: { type: String, required: true },
    origin: { type: String, },
    packing: { type: String, },
    grade: { type: String, default: null },
    qty: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const StockModel = model<TStock>("Stock", stockSchema);
