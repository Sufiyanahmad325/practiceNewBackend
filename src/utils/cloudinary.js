import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOncloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath)return null

        // uploade the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath ,{
            resource_type:"auto",
        })

        // if file has been uploaded successfully
        console.log("this is file is uploaded on cloudinary => " , response.url );
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporory file as the uploade operation got failed
        return null;
    }
}


