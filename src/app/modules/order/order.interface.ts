

// TypeScript Interface
type TItem = {
  itemDescription: string;
  origin: string;
  packing: string;
  grade: string;
  qty: number;
  key: number;
  purchasePrice: number;
  sellingPrice: number;
}

export type TOrder = {
  selectedType: string;
  supplierName1: string;
  proformaInvoiceNo: string;
  invoiceNo: string;
  supplierContractNo1: string;
  customerOrderNo1: string;
  buyingTerms1: string;
  shipmentTerm1: string;
  shipmentDate1: Date;
  estimatedArrivalDate1: Date;
  blNumber1: string;
  vesselVoyageNo: string;
  loadingPort1: string;
  dischargePort1: string;
  customerName: string;
  refNo: string;
  date: Date;
  paymentTerms: string;
  shippingTerms: string;
  notes: string;

  items: TItem[];
  shippingCompanyName: string;
  shippingDate: Date;
  shippingCost: number;
  insurance: number;
  currency: string;
  addShipping: boolean;
  shippingInvoiceNo: string;
  addStorage: boolean;
  storageName: string;
  storageInvoiceNo: string;
  storageDate: Date;
  storageCost: number;
  localTransportName: string;
  localTransportInvoiceNo: string;
  localTransportDate: Date;
  localTransportCost: number;
  addLocalTransport: boolean;
  landTransportName: string;
  landTransportInvoiceNo: string;
  landTransportDate: Date;
  landTransportCost: number;
  addLandTransport: boolean;
  costClearanceName: string;
  costClearanceInvoiceNo: string;
  costClearanceDate: Date;
  costClearanceCost: number;
  addCostClearance: boolean;
  indirectSupplierName: string;
  indirectInvoiceNo: string;
  IndirectSupplierContractNo: number;

}



