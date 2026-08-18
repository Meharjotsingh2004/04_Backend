import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) {
            throw new Error("File path could not be found")
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
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