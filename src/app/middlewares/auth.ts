import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';

import catchAsync from '../utils/catchAsync';
import User from '../modules/user/user.model';
import mongoose from 'mongoose';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is missing


    if (!authHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // Extract the token by removing the 'Bearer' prefix
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;
    // Converting userId to ObjectId if necessary
    const objectId = new mongoose.Types.ObjectId(userId);

    // Checking if the user exists
    const user = await User.findOne({ _id: objectId }); // Using ObjectId for the filter


    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is blocked
    const isUserBlocked = user?.isBlocked;

    if (isUserBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }


    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized!',
      );
    }
    

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
