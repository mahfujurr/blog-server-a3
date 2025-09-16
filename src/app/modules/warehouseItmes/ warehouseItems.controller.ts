
// src/controllers/warehouse.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

import { TWarehouseItem, TWarehousePurchaseHistory, } from "./warehouseItems.interface";
import { warehouseItemService } from "./warehouseItems.service";

// const addMultipleWarehouseItems = catchAsync(async (req: Request, res: Response) => {
//   const { warehouseId, items } = req.body;
//   const payload = req.body;


//   if (!warehouseId || !Array.isArray(items) || items.length === 0) {
//     return sendResponse(res, {
//       success: false,
//       message: "Invalid request data",
//       statusCode: httpStatus.BAD_REQUEST
//     });
//   }

//   const savedItems = await warehouseItemService.createMultipleWarehouseItemsIntoDB(payload);

//   sendResponse(res, {
//     success: true,
//     message: "Items added successfully",
//     statusCode: httpStatus.CREATED,
//     data: { savedItems }
//   });
// });

const createWarehouseItem = catchAsync(async (req: Request, res: Response) => {
  const payload: TWarehousePurchaseHistory = req.body;
  const result = await warehouseItemService.createWarehouseItemIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "WarehouseItem added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllWarehouseItems = catchAsync(async (req: Request, res: Response) => {
  const result = await warehouseItemService.getAllWarehouseItemsFromDB();
  sendResponse(res, {
    success: true,
    message: "WarehouseItems fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleWarehouseItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await warehouseItemService.getSingleWarehouseItemFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "WarehouseItem not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "WarehouseItem fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateWarehouseItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TWarehouseItem> = req.body;
  const result = await warehouseItemService.updateWarehouseItemIntoDB(id, payload);

  sendResponse(res, {
    success: true,
    message: "WarehouseItem updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});


// controllers/warehouseItem.controller.ts

const bulkDeductWarehouseItems = catchAsync(async (req: Request, res: Response) => {
  const { warehouseId, items } = req.body;
  const result = await warehouseItemService.bulkDeductItemsByWarehouseIntoDB(warehouseId, items);

  sendResponse(res, {
    success: true,
    message: "Warehouse items quantities deducted successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});


const deleteWarehouseItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await warehouseItemService.deleteWarehouseItemFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "WarehouseItem not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "WarehouseItem deleted successfully",
    statusCode: httpStatus.OK,
  });
});

// 🕓 Purchase History Controllers
const getAllPurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const history = await warehouseItemService.getAllPurchaseHistoryFromDB();

  sendResponse(res, {
    success: true,
    message: "Purchase history fetched successfully",
    statusCode: httpStatus.OK,
    data: history,
  });
});
const getSinglePurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const historyItem = await warehouseItemService.getSinglePurchaseHistoryFromDB(id);

  if (!historyItem) {
    return sendResponse(res, {
      success: false,
      message: "Purchase history item not found",
      statusCode: httpStatus.NOT_FOUND,
    });
  }

  sendResponse(res, {
    success: true,
    message: "Purchase history item fetched successfully",
    statusCode: httpStatus.OK,
    data: historyItem,
  });
});

const createPurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const payload: TWarehouseItem = req.body;
  const historyItem = await warehouseItemService.createPurchaseHistoryIntoDB(payload);

  sendResponse(res, {
    success: true,
    message: "Purchase history created successfully",
    statusCode: httpStatus.CREATED,
    data: historyItem,
  });
});
// src/controllers/warehouse.controller.ts

const updatePurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TWarehousePurchaseHistory> = req.body;
  const result = await warehouseItemService.updatePurchaseHistoryIntoDB(id, payload);

  if (!result) {
    return sendResponse(res, {
      success: false,
      message: "Purchase history item not found",
      statusCode: httpStatus.NOT_FOUND,
    });
  }

  sendResponse(res, {
    success: true,
    message: "Purchase history item updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});



const deletePurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await warehouseItemService.deletePurchaseHistoryFromDB(id);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Purchase history not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    message: "Purchase history deleted successfully",
    statusCode: httpStatus.OK,
  });
});



export const warehouseItemController = {
  createWarehouseItem,
  getAllWarehouseItems,
  getSingleWarehouseItem,
  updateWarehouseItem,
  deleteWarehouseItem,
  // addMultipleWarehouseItems,
  bulkDeductWarehouseItems,
  // 🕓 Purchase History
  getAllPurchaseHistory,
  getSinglePurchaseHistory,
  createPurchaseHistory,
  updatePurchaseHistory,
  deletePurchaseHistory
};