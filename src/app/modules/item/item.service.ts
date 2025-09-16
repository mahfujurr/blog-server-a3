// src/services/category.service.ts

import { TCategory } from "./item.interface";
import { CategoryModel } from "./item.model";


const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await CategoryModel.find();
  return result;
};

const getSingleCategoryFromDB = async (name: string) => {
  const result = await CategoryModel.findOne({ name });
  return result;
};

const updateCategoryIntoDB = async (name: string, payload: Partial<TCategory>) => {
  const result = await CategoryModel.findOneAndUpdate({ name }, payload, { new: true });
  return result;
};

const deleteCategoryFromDB = async (name: string) => {
  const result = await CategoryModel.findOneAndDelete({ name });
  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};