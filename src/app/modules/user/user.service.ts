import bcrypt from "bcryptjs";
import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";

const createPatient = async (req: Request) => {
  // console.log(req);
  let photoUrl = null;
  if (req.file) {
    const profilePhotoUrl = await fileUploader.uploadCloudinary(req.file);
   photoUrl = profilePhotoUrl;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    config.salt_rounds,
  );
  const { patient } = req.body;
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        name: patient.name,
        email: patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        name: patient.name,
        email: patient.email,
        profilePhoto: photoUrl,
      },
    });
  });
  return result;
};

export const UserService = {
  createPatient,
};
