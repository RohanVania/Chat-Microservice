import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { prisma } from "../..";
import jsonwebtoken from "jsonwebtoken"

export const LoginUserOperation = async (req: Request, resp: Response) => {
    try {
        const { email, password } = req.body;
        const UserDetail = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            }
        })

        const checkPassword=await bcrypt.compare(password,UserDetail.password)
        
        if(checkPassword){

            const jsonwebtokenPayload={id:UserDetail.id,email:UserDetail.email,username:UserDetail.username,profilePicture:UserDetail.profilePicture,role:UserDetail.role};
            const secret=process.env.JWT_TOKEN_SECRET
            const token=jsonwebtoken.sign(jsonwebtokenPayload,`${secret}`,{
                expiresIn:process.env.JWT_EXPIRES_IN
            })
            // console.log(token);
            resp.cookie("AuthToken",token,{
                expires: new Date(Date.now() + 3600*1000) // 1 hr
            })
            return resp.status(200).json({
                status:"Success",
                msg:"User logged in successfully",
                data:jsonwebtokenPayload,
                token:token
            })

        }else{
            return resp.status(200).json({
                status:"Failed",
                msg:"Incorrect password",
            })
        }

    } catch (err) {
        console.log(err);
        resp.status(200).json({
            status:"Failed",
            msg:"Something went wrong in login / user not found",
            data: err
        })
    }
}

export const LogoutUserOperation=async(req:Request,resp:Response)=>{
    console.log("hello")
    try{
        resp.clearCookie('AuthToken');
        resp.end();
    }catch(err){
        console.log(err);
        resp.status(200).json({
            status:'Failed',
            msg:'Something went wrong in Logout',
            data:err
        })
    }
}