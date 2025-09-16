import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";
import { TProduct } from "./product.interface";


const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload: TProduct = req.body;
  const result = await productService.createProductIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Product added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllProductsFromDB();
  sendResponse(res, {
    success: true,
    message: "Products fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.getSingleProductFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Product not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Product fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: Partial<TProduct> = req.body;
  const result = await productService.updateProductIntoDB(id, payload);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Product not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Product updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.deleteProductFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Product not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Product deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
