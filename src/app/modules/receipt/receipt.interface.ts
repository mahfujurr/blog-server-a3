export type TReceipt = {
  customerName: string;
  receiptNumber: string;
  date: Date;
  currency: string;
  amount: number;
  aedRate: number;
  convertedAmount: number;
  amountInWords: string;
  invoicePurpose: string;
  isAedConversion: boolean;
  isInvoice: boolean;
  isPartPayment: boolean;
  isLpo: boolean;
  isOther: boolean;
  notes: string;
};
