import { UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { LoginInputType } from "./auth.interface";
import bcrypt from "bcryptjs";
import { AppError } from "../../shared/appError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { SignApiOptions } from "cloudinary";
import { jwtHelper } from "../../helpers/jwtHelper";
const loginUser = async (payload: LoginInputType) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: UserStatus.ACTIVE },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isCorrectPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "password went wrong");
  }
  const jwt_secret = config.jwt_secret;
  const jwt_expires_in = config.jwt_expires_in;
  if (!jwt_secret) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "jwt not found");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    jwt_secret,
    "1h",
  );
  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    jwt_secret,
    "90d",
  );

  return { accessToken, refreshToken,needPasswordChange:user.needPasswordChange };
};

export const AuthService = {
  loginUser,
};
