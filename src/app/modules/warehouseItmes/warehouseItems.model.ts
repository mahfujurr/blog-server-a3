import mongoose, { Schema } from "mongoose";
import { TWarehousePurchaseHistory } from "./warehouseItems.interface";

const PurchaseItemSchema = new Schema({
  itemDescription: { type: String, required: true },
  origin: { type: String },
  packing: { type: String },
  grade: { type: String },
  qty: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  key: { type: Number },
});

const WarehousePurchaseHistorySchema = new Schema<TWarehousePurchaseHistory>(
  {
    supplierName1: String,
    proformaInvoiceNo: String,
    invoiceNo: String,
    supplierContractNo1: String,
    customerOrderNo1: String,
    buyingTerms1: String,
    shipmentTerm1: String,
    shipmentDate1: Date,
    estimatedArrivalDate1: Date,
    blNumber1: String,
    vesselVoyageNo: String,
    loadingPort1: String,
    dischargePort1: String,
    selectedWarehouse: String,
    notes: String,

    // Shipping
    addShipping: { type: Boolean, default: false },
    shippingCompanyName: String,
    shippingInvoiceNo: String,
    shippingDate: Date,
    shippingCost: Number,
    insurance: String,

    // Storage
    addStorage: { type: Boolean, default: false },
    storageName: String,
    storageInvoiceNo: String,
    storageDate: Date,
    storageCost: Number,

    // Local Transport
    addLocalTransport: { type: Boolean, default: false },
    localTransportName: String,
    localTransportInvoiceNo: String,
    localTransportDate: Date,
    localTransportCost: Number,

    // Land Transport
    addLandTransport: { type: Boolean, default: false },
    landTransportName: String,
    landTransportInvoiceNo: String,
    landTransportDate: Date,
    landTransportCost: Number,

    // Cost Clearance
    addCostClearance: { type: Boolean, default: false },
    costClearanceName: String,
    costClearanceInvoiceNo: String,
    costClearanceDate: Date,
    costClearanceCost: Number,

    // Indirect Supplier
    indirectSupplierName: String,
    indirectInvoiceNo: String,
    IndirectSupplierContractNo: Number,

    currency: String,
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },

    // Purchase Items
    items: [PurchaseItemSchema],
  },
  { timestamps: true }
);

export const WarehousePurchaseHistoryModel = mongoose.model<TWarehousePurchaseHistory>(
  "WarehousePurchaseHistory",
  WarehousePurchaseHistorySchema
);
