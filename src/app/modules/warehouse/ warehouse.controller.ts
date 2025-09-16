
// src/controllers/warehouse.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

import { TWarehouse } from "./warehouse.interface";
import { warehouseService } from "./warehouse.service";


const createWarehouse = catchAsync(async (req: Request, res: Response) => {
  const payload: TWarehouse = req.body;
  const result = await warehouseService.createWarehouseIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Warehouse added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllWarehouses = catchAsync(async (req: Request, res: Response) => {
  const result = await warehouseService.getAllWarehousesFromDB();
  sendResponse(res, {
    success: true,
    message: "Warehouses fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleWarehouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await warehouseService.getSingleWarehouseFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Warehouse not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Warehouse fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateWarehouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TWarehouse> = req.body;
  const result = await warehouseService.updateWarehouseIntoDB(id, payload);
  
  sendResponse(res, {
    success: true,
    message: "Warehouse updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteWarehouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await warehouseService.deleteWarehouseFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Warehouse not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Warehouse deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const warehouseController = {
  createWarehouse,
  getAllWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
};