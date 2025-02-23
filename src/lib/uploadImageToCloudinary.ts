"use server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImagetoCloudinary = async (dataUri: string) => {
  try {
    if (!dataUri) {
      return null;
    }
    const res = await cloudinary.uploader.upload(dataUri, {
      folder: "images",
      unique_filename: true,
      transformation: [
        { format: "webp", quality: "100", fetch_format: "auto" },
      ],
    });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { uploadImagetoCloudinary };
