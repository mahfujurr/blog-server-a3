import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StockService } from "./stocks.service";


const createStock = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.createStockIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Stock created successfully",
    data: result,
  });
});

const getAllStocks = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.getAllStocksFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Stocks retrieved successfully",
    data: result,
  });
});

const getSingleStock = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.getSingleStockFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Stock retrieved successfully",
    data: result,
  });
});

const updateStock = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.updateStockIntoDB(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Stock updated successfully",
    data: result,
  });
});

const deleteStock = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.deleteStockFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Stock deleted successfully",
    data: result,
  });
});

export const StockController = {
  createStock,
  getAllStocks,
  getSingleStock,
  updateStock,
  deleteStock,
};
