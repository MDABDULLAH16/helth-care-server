import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const uploadCloudinary = async (file: Express.Multer.File) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "/uploads",
  });
  return uploadResult.secure_url;
};

export const fileUploader = {
  upload,
  uploadCloudinary,
};
