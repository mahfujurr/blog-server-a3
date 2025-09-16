import { Document, Types } from "mongoose";

export type TStock = {
  warehouse: Types.ObjectId;
  itemDescription: string;
  origin?: string;
  packing?: string;
  grade?: string | null;
  qty: number;
  purchasePrice: number;
};

export type TStockDocument = TStock & Document;
