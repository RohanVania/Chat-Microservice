import { Request, Response } from "express";
import {s3} from "../config/awsS3"

export const RegisterUserOperation=async (req:Request,resp:Response)=>{
    try{
            // console.log("Inside Register User");
            // const {profilePicture,userName,email,password}=req.body;
            // const file= new File([profilePicture],"test")
            // console.log("File =>",file);
            const file:any=req.files;
            // console.log(file)
            
            const res= await s3.getSignedUrlPromise("getObject",{
                Bucket:"registertestimages",
                Key:`${file?.profilePicture.name}-${Math.floor(Math.random()*10000)}`,
                Body:file?.profilePicture?.data,
            })
            

            return resp.json(res)

    }catch(err){
        console.log(err)
    }
}

