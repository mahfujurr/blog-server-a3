import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductIntoDB = async (payload: TProduct) => {
  return await Product.create(payload);
};

const getAllProductsFromDB = async () => {
  return await Product.find();
};

const getSingleProductFromDB = async (id: string) => {
  return await Product.findById(id);
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProductFromDB = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
