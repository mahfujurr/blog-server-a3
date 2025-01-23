// req and res manage


import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const createUser = catchAsync(

  async (req, res) => {
    const payload = req.body

    const result = await userService.createUser(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });

  })

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId

  const result = await userService.getSingleUser(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getting successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await userService.deleteUser(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully',
    data: {},
  })
})

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
