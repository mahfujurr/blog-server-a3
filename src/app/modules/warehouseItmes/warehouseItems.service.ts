
// src/services/warehouse.service.ts
import { TStockDocument } from "../stocks/stocks.interface";
import { StockModel } from "../stocks/stocks.model";
import { TWarehouseItem, TWarehousePurchaseHistory } from "./warehouseItems.interface";
import { WarehousePurchaseHistoryModel } from "./warehouseItems.model";

const createWarehouseItemIntoDB = async (payload: TWarehousePurchaseHistory) => {
  try {
    const { items, warehouse, ...otherData } = payload;

    // ✅ Step 1: Save purchase history (one document, full metadata)
    const history = await WarehousePurchaseHistoryModel.create({
      ...otherData,
      warehouse,
      items,
    });

    const updatedRecords = [];

    for (const item of items!) {
      // ✅ Step 2: Check if item exists in warehouse
      const existingItem = await StockModel.findOne({
        warehouse,
        itemDescription: item.itemDescription,
      }) as TStockDocument | null;


      if (existingItem) {
        // ✅ Step 3: Update qty + avg price
        const totalQty = existingItem.qty + item.qty;
        const avgPrice =
          ((existingItem.purchasePrice * existingItem.qty) +
            (item.purchasePrice * item.qty)) /
          totalQty;

        existingItem.qty = totalQty;
        existingItem.purchasePrice = avgPrice;
        await existingItem.save();
        updatedRecords.push(existingItem);
      } else {
        // ✅ Step 4: Insert new item into inventory
        const newItem = await StockModel.create({
          warehouse,
          ...item,
        });
        updatedRecords.push(newItem);
      }
    }

    return {
      success: true,
      message: "Warehouse records saved/updated successfully",
      history,
      data: updatedRecords,
    };
  } catch (error) {
    return { success: false, message: "Failed to save data", error };
  }
};

const getAllWarehouseItemsFromDB = async () => {
  return await WarehousePurchaseHistoryModel.find().populate("warehouse");
};

const getSingleWarehouseItemFromDB = async (id: string) => {
  return await WarehousePurchaseHistoryModel.findOne({ id }).populate("warehouse");
};

const updateWarehouseItemIntoDB = async (id: string, payload: Partial<TWarehouseItem>) => {
  return await WarehousePurchaseHistoryModel.findByIdAndUpdate(id, payload, { new: true });
};
// services/warehouseItem.service.ts



const bulkDeductItemsByWarehouseIntoDB = async (
  warehouseId: string,
  items: {
    itemDescription: string;
    qty: number;
    selectedWarehouse: string;
  }[]
) => {
  try {
    const updatedRecords = [];


    for (const item of items) {
      const existingItem = await StockModel.findOne({
        warehouse: item.selectedWarehouse,
        itemDescription: item.itemDescription,
      });
      if (!existingItem) {
        throw new Error(`Item "${item.itemDescription}" not found in warehouse.`);
      }

      if (existingItem.qty < item.qty) {
        throw new Error(`Not enough stock for "${item.itemDescription}". Available: ${existingItem.qty}, Requested: ${item.qty}`);
      }

      existingItem.qty -= item.qty;
      await existingItem.save();
      updatedRecords.push(existingItem);
    }

    return {
      success: true,
      message: "Warehouse items quantities deducted successfully",
      data: updatedRecords,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to deduct warehouse items",

    };
  }
};




const deleteWarehouseItemFromDB = async (id: string) => {
  return await WarehousePurchaseHistoryModel.findOneAndDelete({ id });
};
const getAllPurchaseHistoryFromDB = async () => {
  return await WarehousePurchaseHistoryModel.find().sort({ createdAt: -1 }).populate("warehouse");
};
const getSinglePurchaseHistoryFromDB = async (id: string) => {
  return await WarehousePurchaseHistoryModel.findById(id).populate("warehouse");
};

const createPurchaseHistoryIntoDB = async (payload: TWarehouseItem) => {
  return await WarehousePurchaseHistoryModel.create(payload);
};
// src/services/warehouse.service.ts

const updatePurchaseHistoryIntoDB = async (
  id: string,
  payload: Partial<TWarehousePurchaseHistory>
) => {
  try {
    // ✅ Step 1: Fetch old purchase history (before update)
    const oldHistory = await WarehousePurchaseHistoryModel.findById(id);
    if (!oldHistory) {
      throw new Error("Purchase history not found");
    }

    // ✅ Step 2: Update purchase history itself
    const updatedHistory = await WarehousePurchaseHistoryModel.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    ).populate("warehouse");

    if (!updatedHistory) {
      throw new Error("Failed to update purchase history");
    }

    // ✅ Step 3: Compare old items vs new items
    const oldItems = oldHistory.items || [];
    const newItems = payload.items || [];

    const warehouse = payload.warehouse || oldHistory.warehouse;

    const updatedRecords = [];

    // Step 3a: Deduct old items from stock
    for (const item of oldItems) {
      const stockItem = await StockModel.findOne({
        warehouse,
        itemDescription: item.itemDescription,
      });

      if (stockItem) {
        stockItem.qty -= item.qty; // remove old qty first
        if (stockItem.qty < 0) stockItem.qty = 0; // safety net
        await stockItem.save();
      }
    }

    // Step 3b: Add new items to stock
    for (const item of newItems) {
      const stockItem = await StockModel.findOne({
        warehouse,
        itemDescription: item.itemDescription,
      });

      if (stockItem) {
        // recalc new total qty + avg price
        const totalQty = stockItem.qty + item.qty;
        const avgPrice =
          ((stockItem.purchasePrice * stockItem.qty) +
            (item.purchasePrice * item.qty)) /
          totalQty;

        stockItem.qty = totalQty;
        stockItem.purchasePrice = avgPrice;
        await stockItem.save();
        updatedRecords.push(stockItem);
      } else {
        // if not exists, create new stock entry
        const newStock = await StockModel.create({
          warehouse,
          ...item,
        });
        updatedRecords.push(newStock);
      }
    }

    return {
      success: true,
      message: "Purchase history and stock updated successfully",
      history: updatedHistory,
      data: updatedRecords,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update purchase history and stock",
      error,
    };
  }
};


const deletePurchaseHistoryFromDB = async (id: string) => {
  return await WarehousePurchaseHistoryModel.findByIdAndDelete(id);
};


export const warehouseItemService = {
  createWarehouseItemIntoDB,
  getAllWarehouseItemsFromDB,
  getSingleWarehouseItemFromDB,
  updateWarehouseItemIntoDB,
  deleteWarehouseItemFromDB,
  bulkDeductItemsByWarehouseIntoDB,
  // createMultipleWarehouseItemsIntoDB,
  // 🕓 Purchase History
  getAllPurchaseHistoryFromDB,
  getSinglePurchaseHistoryFromDB,
  createPurchaseHistoryIntoDB,
  updatePurchaseHistoryIntoDB,
  deletePurchaseHistoryFromDB
};