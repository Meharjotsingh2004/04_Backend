import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import {config} from 'dotenv';

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async(localFilePath, foldername = "videotube") => {
    try {
        if(!localFilePath) return null ;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder : foldername
        })

        // Delete file from local storage after successful upload
        if(fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }

        console.log("File uploaded successfully to Cloudinary", response.url)
        return response

    } catch (error) {
        // Delete file from local storage if upload fails
        if(fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        throw error
    }
}