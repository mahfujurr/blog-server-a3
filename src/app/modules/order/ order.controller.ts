import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";
import { TOrder } from "./order.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload: TOrder = req.body;
  const result = await orderService.createOrderIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Order added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrdersFromDB();
  sendResponse(res, {
    success: true,
    message: "Orders fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getSingleOrderFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Order not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Order fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TOrder> = req.body;
  const result = await orderService.updateOrderIntoDB(id, payload);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Order not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Order updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.deleteOrderFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Order not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Order deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
