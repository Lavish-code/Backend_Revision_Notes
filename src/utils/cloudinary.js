import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs"; // It helps in read write file 


dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});



const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //UPLOAD THE FILE ON CLOUDINARY
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto",
        });


        try{
            fs.unlinkSync(localFilePath);
        }catch(_){

        }
        //console.log("File is uploaded on cloudinary", result.url || result.secure_url);
        return result;
    }catch(error){
        try {
            if(localFilePath) fs.unlinkSync(localFilePath)
        } catch (_) {}
        //remove the locally saved temporay  file as the upload operation got failed 
        return null
    }
};



    
export { uploadOnCloudinary }