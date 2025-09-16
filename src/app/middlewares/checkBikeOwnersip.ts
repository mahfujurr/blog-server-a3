// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { bikeService } from '../modules/bike/bike.service';
// import AppError from '../errors/AppError';
// import catchAsync from '../utils/catchAsync';

// const checkBikeOwnership = () => {
//     return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { id } = req.params;
//             const userId = req.user?.userId;


//             const bike = await bikeService.getSingleBikeFromDB(id);

//             if (!bike) {
//                 throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
//             }


//             if (bike.author._id.toString() !== userId) {
//                 throw new AppError(
//                     httpStatus.FORBIDDEN,
//                     'You are not authorized to perform this action on this bike'
//                 );
//             }

//             next();
//         } catch (error) {
//             next(error);
//         }
//     });
// };

// export default checkBikeOwnership;
