import { TStock } from "./stocks.interface";
import { StockModel } from "./stocks.model";


const createStockIntoDB = async (payload: TStock) => {
  return await StockModel.create(payload);
};

const getAllStocksFromDB = async () => {
  return await StockModel.find().populate("warehouse");
};

const getSingleStockFromDB = async (id: string) => {
  return await StockModel.findById(id).populate("warehouse");
};

const updateStockIntoDB = async (id: string, payload: Partial<TStock>) => {
  return await StockModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteStockFromDB = async (id: string) => {
  return await StockModel.findByIdAndDelete(id);
};

export const StockService = {
  createStockIntoDB,
  getAllStocksFromDB,
  getSingleStockFromDB,
  updateStockIntoDB,
  deleteStockFromDB,
};
