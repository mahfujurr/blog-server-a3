import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBlog = catchAsync(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId; // Extract userId from req.user set by auth middleware

        const payload = req.body; // Blog details from request body
        const result = await blogService.createBlogIntoDB(payload, userId);
        sendResponse(res, {
            success: true,
            message: "Blog created successfully",
            statusCode: httpStatus.CREATED,
            data: result
        })
    }
)
const getAllBlogs = catchAsync(
    async (req: Request, res: Response) => {
        const result = await blogService.getAllBlogsFromDB(req.query);
        sendResponse(res, {
            success: true,
            message: "Blogs fetched successfully",
            statusCode: httpStatus.OK,
            data: result
        })
    }
)
const getSingleBlog = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await blogService.getSingleBlogFromDB(id);

        sendResponse(res, {
            success: true,
            message: "Blog fetched successfully",
            statusCode: httpStatus.OK,
            data: result
        })

    }
)
const updateBlog = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await blogService.updateBlogIntoDB(id, req.body);

        sendResponse(res, {
            success: true,
            message: "Blog updated successfully",
            statusCode: httpStatus.OK,
            data: result
        })

    }
)
const deleteBlog = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params; // Blog ID from request parameters
        // const userId = req.user?.userId; // Extract user ID from the decoded token
        // const userRole = req.user?.role; // Extract user role from the decoded token
        // // Fetching the blog to check ownership
        // const blog = await blogService.getSingleBlogFromDB(id);

        // if (!blog) {
        //     throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
        // }
        // const authorId = blog.author._id.toString();
        // // Checking if the user is the creator of the blog or has an admin role
        // if (authorId !== userId && userRole !== 'admin') {
        //     throw new AppError(
        //         httpStatus.FORBIDDEN,
        //         'You are not authorized to delete this blog'
        //     );
        // }

        // If the check passes, deleting the blog
        await blogService.deleteBlogFromDB(id);
        sendResponse(res, {
            success: true,
            message: "Blog deleted successfully",
            statusCode: httpStatus.OK,

        })

    }
)

export const blogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
}