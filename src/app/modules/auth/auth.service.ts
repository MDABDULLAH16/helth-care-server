import { UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { LoginInputType } from "./auth.interface";
import bcrypt from "bcryptjs";
import { AppError } from "../../shared/appError";
import { StatusCodes } from "http-status-codes";

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
    return user
};

export const AuthService = {
    loginUser
}