import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs"; // It helps in read write file 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});


const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //UPLOAD THE FILE ON CLOUDINARY
        cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        console.log("File is uploaded on Cloudinary" , response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath)//remove the locally saved temporay  file as the upload operation got failed 
        return null
    }
}
    
export {uploadOnCloudinary}