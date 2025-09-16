
// src/services/warehouse.service.ts

import { TWarehouse } from "./warehouse.interface";
import { WarehouseModel } from "./warehouse.model";

const createWarehouseIntoDB = async (payload: TWarehouse) => {
  return await WarehouseModel.create(payload);
};

const getAllWarehousesFromDB = async () => {
  return await WarehouseModel.find();
};

const getSingleWarehouseFromDB = async (id: string) => {
  return await WarehouseModel.findOne({ id });
};

const updateWarehouseIntoDB = async (id: string, payload: Partial<TWarehouse>) => {
  return await WarehouseModel.findByIdAndUpdate( id , payload, { new: true });
};

const deleteWarehouseFromDB = async (id: string) => {
  return await WarehouseModel.findOneAndDelete({ id });
};

export const warehouseService = {
  createWarehouseIntoDB,
  getAllWarehousesFromDB,
  getSingleWarehouseFromDB,
  updateWarehouseIntoDB,
  deleteWarehouseFromDB,
};