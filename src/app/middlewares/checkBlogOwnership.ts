// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { blogService } from '../modules/blog/blog.service';
// import AppError from '../errors/AppError';
// import catchAsync from '../utils/catchAsync';


// const checkBlogOwnership = () => {
//     return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { id } = req.params; // Get blog ID from route params
//             const userId = req.user?.userId; // Extract user ID from authenticated request

//             // Fetch the blog to verify ownership
//             const blog = await blogService.getSingleBlogFromDB(id);

//             if (!blog) {
//                 throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
//             }

//             // Check if the user is the blog's author or an admin (if allowed)
//             if (blog.author._id.toString() !== userId) {
//                 throw new AppError(
//                     httpStatus.FORBIDDEN,
//                     'You are not authorized to perform this action on this blog'
//                 );
//             }

//             next(); // Pass control to the next middleware or controller
//         } catch (error) {
//             next(error); // Pass any errors to the error-handling middleware
//         }
//     })
// };

// export default checkBlogOwnership;
