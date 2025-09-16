import mongoose from "mongoose";

// types.ts
export type TPurchaseItem = {
  itemDescription: string;
  origin: string;
  packing: string;
  grade?: string;
  qty: number;
  purchasePrice: number;
  key?: number;
};

export type TWarehousePurchaseHistory = {
  supplierName1?: string;
  proformaInvoiceNo?: string;
  invoiceNo?: string;
  supplierContractNo1?: string;
  customerOrderNo1?: string;
  buyingTerms1?: string;
  shipmentTerm1?: string;
  shipmentDate1?: Date;
  estimatedArrivalDate1?: Date;
  blNumber1?: string;
  vesselVoyageNo?: string;
  loadingPort1?: string;
  dischargePort1?: string;
  selectedWarehouse?: string;
  notes?: string;
  addShipping?: boolean;
  shippingCompanyName?: string;
  shippingInvoiceNo?: string;
  shippingDate?: Date;
  shippingCost?: number;
  insurance?: string;
  addStorage?: boolean;
  storageName?: string;
  storageInvoiceNo?: string;
  storageDate?: Date;
  storageCost?: number;
  localTransportName?: string;
  localTransportInvoiceNo?: string;
  localTransportDate?: Date;
  localTransportCost?: number;
  addLocalTransport?: boolean;
  landTransportName?: string;
  landTransportInvoiceNo?: string;
  landTransportDate?: Date;
  landTransportCost?: number;
  addLandTransport?: boolean;
  costClearanceName?: string;
  costClearanceInvoiceNo?: string;
  costClearanceDate?: Date;
  costClearanceCost?: number;
  addCostClearance?: boolean;
  indirectSupplierName?: string;
  indirectInvoiceNo?: string;
  IndirectSupplierContractNo?: number;
  currency?: string;
  warehouse?: mongoose.Types.ObjectId;
  items?: TPurchaseItem[];
};

export type TWarehouseItem = {
  warehouse: mongoose.Types.ObjectId;
  itemDescription: string;
  origin?: string;
  packing?: string;
  grade?: string;
  qty: number;
  purchasePrice: number;
};
