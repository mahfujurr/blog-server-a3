import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: httpStatus.CREATED,
    data: result
  })
})
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    message: "Login successfully",
    statusCode: httpStatus.OK,
    data: { token: result?.token }
  })
})




export const AuthControllers = {
  register,
  login
}