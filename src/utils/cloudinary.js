import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs"; // It helps in read write file 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file to Cloudinary and wait for result
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // Remove the local temp file after successful upload
    try {
      fs.unlinkSync(localFilePath);
    } catch (_) {
      // ignore unlink errors
    }
    console.log("File is uploaded on Cloudinary", result.url || result.secure_url);
    return result;
  } catch (error) {
    // remove the local file if upload failed
    try {
      if (localFilePath) fs.unlinkSync(localFilePath);
    } catch (_) {}
    return null;
  }
};
    
export { uploadOnCloudinary } 