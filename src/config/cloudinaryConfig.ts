
import  { v2 as cloudinary} from "cloudinary"


const cloudinaryInitialize= ()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    })
    return cloudinary;
}
    


export default cloudinaryInitialize;