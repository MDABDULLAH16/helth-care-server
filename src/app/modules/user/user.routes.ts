import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createPatientSchema } from "./user.validation";
import { fileUploader } from "../../helpers/fileUploader";

const router = Router();
router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createPatientSchema.parse(JSON.parse(req.body.data));
    return UserController.createPatientReq(req,res,next);
  },
);

export const UserRoutes = router;
