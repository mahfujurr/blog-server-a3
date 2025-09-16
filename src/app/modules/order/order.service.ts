import { TOrder } from "./order.interface";
import { Order } from "./order.model";



const createOrderIntoDB = async (payload: TOrder) => {
  return await Order.create(payload);
};

const getAllOrdersFromDB = async () => {
  return await Order.find();
};

const getSingleOrderFromDB = async (id: string) => {
  return await Order.findById(id);
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  return await Order.findByIdAndUpdate(id, payload, { new: true });
};

const deleteOrderFromDB = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export const orderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
