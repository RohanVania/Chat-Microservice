import { Request, Response } from "express";
// import {s3} from "../config/awsS3"
import { cloudinary, prisma } from "../../index"
import bcrypt from "bcryptjs";



export const RegisterUserOperation = async (req: Request, resp: Response) => {
    try {
        const { userName, email, password, role } = req.body;
        
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
        const checkUserExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!checkUserExist) {
            const res = await cloudinary.uploader.upload(file.profilePicture.tempFilePath,
                {
                    folder: "/RegisterUser",
                    resource_type: "auto"
                }
            )
            const imageUrl = res.secure_url;

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertResult = await prisma.user.create({
                data: {
                    email: email,
                    username: userName,
                    password: hashedPassword,
                    profilePicture: imageUrl,
                    role:role
                }
            })

            console.log(insertResult);
            return resp.status(200).json({
                status: "Success",
                msg: "User created successfully",
                data: insertResult
            })

        } else {
            return resp.status(200).json({
                status: "Failed",
                msg: "User with given email already exists",
                data: checkUserExist
            })
        }


    } catch (err:any) {
        console.log(err)
        return resp.status(200).json({
            status:"Failed",
            data:err
        })
    }
}

