import mongoose, { Schema } from "mongoose";
import { TReceipt } from "./receipt.interface";


const receiptSchema = new Schema<TReceipt>(
  {
    customerName: { type: String },
    receiptNumber: { type: String },
    date: { type: Date },
    currency: { type: String },
    amount: { type: Number },
    aedRate: { type: Number, default: 3.67 },
    convertedAmount: { type: Number },
    amountInWords: { type: String },
    invoicePurpose: { type: String },
    isAedConversion: { type: Boolean, default: false },
    isInvoice: { type: Boolean, default: false },
    isPartPayment: { type: Boolean, default: false },
    isLpo: { type: Boolean, default: false },
    isOther: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

export const ReceiptModel = mongoose.model<TReceipt>("Receipt", receiptSchema);
