import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createPatientReq = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

export const UserController = {
  createPatientReq,
};
