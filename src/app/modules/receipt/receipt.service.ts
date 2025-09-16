import { TReceipt } from "./receipt.interface";
import { ReceiptModel } from "./receipt.model";


const createReceiptIntoDB = async (payload: TReceipt) => {
  return await ReceiptModel.create(payload);
};

const getAllReceiptsFromDB = async () => {
  return await ReceiptModel.find();
};

const getSingleReceiptFromDB = async (id: string) => {
  return await ReceiptModel.findById(id);
};

const updateReceiptIntoDB = async (id: string, payload: Partial<TReceipt>) => {
  return await ReceiptModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteReceiptFromDB = async (id: string) => {
  return await ReceiptModel.findByIdAndDelete(id);
};

export const receiptService = {
  createReceiptIntoDB,
  getAllReceiptsFromDB,
  getSingleReceiptFromDB,
  updateReceiptIntoDB,
  deleteReceiptFromDB,
};
