import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';
import { Request, Response } from 'express';


const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  await adminServices.blockUser(userId); // Service logic to block the user

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  })
});
const deleteSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await adminServices.deleteBlogFromDB(id); // Service logic to delete the blog

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  blockUser,
  deleteSingleBlog
}