/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { BlogModel } from '../blog/blog.model';

const blockUser = async (userId: string) => {
  // Check if the user exists
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update the user's isBlocked status
  user.isBlocked = true;
  await user.save();
};

const deleteBlogFromDB = async (id: string) => {
  // Check if the blog exists
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Delete the blog
  await BlogModel.findByIdAndDelete(id);
};

export const adminServices = {
  blockUser,
  deleteBlogFromDB
};