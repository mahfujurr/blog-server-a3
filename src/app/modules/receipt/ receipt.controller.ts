import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { receiptService } from "./receipt.service";
import { TReceipt } from "./receipt.interface";


const createReceipt = catchAsync(async (req: Request, res: Response) => {
  const payload: TReceipt = req.body;
  const result = await receiptService.createReceiptIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Receipt added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllReceipts = catchAsync(async (_req: Request, res: Response) => {
  const result = await receiptService.getAllReceiptsFromDB();
  sendResponse(res, {
    success: true,
    message: "Receipts fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleReceipt = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await receiptService.getSingleReceiptFromDB(id);
  if (!result) {
    return sendResponse(res, {
      success: false,
      message: "Receipt not found",
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  sendResponse(res, {
    success: true,
    message: "Receipt fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateReceipt = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TReceipt> = req.body;
  const result = await receiptService.updateReceiptIntoDB(id, payload);
  sendResponse(res, {
    success: true,
    message: "Receipt updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteReceipt = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await receiptService.deleteReceiptFromDB(id);
  if (!result) {
    return sendResponse(res, {
      success: false,
      message: "Receipt not found",
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  sendResponse(res, {
    success: true,
    message: "Receipt deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const receiptController = {
  createReceipt,
  getAllReceipts,
  getSingleReceipt,
  updateReceipt,
  deleteReceipt,
};
