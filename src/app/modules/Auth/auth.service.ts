import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'


const register = async (payload: IUser) => {
  const result = await User.create(payload)
  const createdUser = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
  return createdUser;
}

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new Error('This user is not found !')
  }

  // checking if the user is inactive
  const userStatus = user?.isBlocked

  if (userStatus) {
    throw new Error('This user is blocked ! !')
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials")
  }
// console.log(user?.id);
  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    userId : user?.id,
  }

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });

  return { token, user };
}

export const AuthService = {
  register,
  login,
}
