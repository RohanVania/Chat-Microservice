import { Request, Response } from "express";
// import {s3} from "../config/awsS3"
import {cloudinary, prisma} from "../index"
export const RegisterUserOperation = async (req: Request, resp: Response) => {
    try {
        const { userName, email, password } = req.body;
        // const file= new File([profilePicture],"test")
        // console.log("File =>",file);
        // const res=new File([profilePicture],"he");
        // console.log("res",res);
        // console.log(file)

        // const res= await s3.getSignedUrlPromise("getObject",{
        //     Bucket:"registertestimages",
        //     Key:`${file?.profilePicture.name}-${Math.floor(Math.random()*10000)}`,
        //     Body:file?.profilePicture?.data,
        // })
        const file: any = req.files;

        console.log(file);

        const checkUserExist=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        console.log(checkUserExist);

        const res=await cloudinary.uploader.upload(file.profilePicture.tempFilePath, 
            {
                folder:"/RegisterUser",   
                resource_type:"auto"
            }
        )
        const imageUrl=res.secure_url;
        

        const insertResult=await prisma.user.create({
            data:{
                email:email,
                username:userName,
                password:password,
                profilePicture:imageUrl,
            }
        })

        console.log(insertResult)


    } catch (err) {
        console.log(err)
    }
}

