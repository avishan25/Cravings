import cloudinary from "../config/cloudinary.config.js"
import fs from "fs"
const uploadImage=async(file)=>{
    try {
        const result =await cloudinary.uploader.upload(file)
        console.log(result);
    } catch (error) {
       console.log(error)
    }
    finally{
        fs.unlinkSync(file)
    }
}

export default uploadImage;