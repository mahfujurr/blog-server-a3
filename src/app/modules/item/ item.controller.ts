// src/controllers/category.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./item.service";
import { TCategory } from "./item.interface";


const createCategory = catchAsync(async (req: Request, res: Response) => {
  const payload: TCategory = req.body;
  const result = await categoryService.createCategoryIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Category added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoriesFromDB();
  sendResponse(res, {
    success: true,
    message: "Categories fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await categoryService.getSingleCategoryFromDB(name);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Category not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Category fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.params;
  const payload: Partial<TCategory> = req.body;
  const result = await categoryService.updateCategoryIntoDB(name, payload);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Category not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Category updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await categoryService.deleteCategoryFromDB(name);
  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Category not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    message: "Category deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};