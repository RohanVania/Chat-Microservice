import { Request,Response } from "express"
import { prisma } from ".."

export const getAllDoctors=async (req:Request,resp:Response)=>{
    try{
       const allDoctors= await prisma.user.findMany({
            where:{
                role:'doctor'
            },
            select:{
                username:true,
                email:true,
                password:false,
                profilePicture:true,
                role:true
            }
        })

        let responsemsg;
        if(allDoctors.length===0){
            responsemsg='There are no doctors registered in our website'
        }else{
            responsemsg='List of all doctors'
        }


        return resp.status(200).json({
            status:"Success",
            msg:responsemsg,
            data:allDoctors
        })

    }catch(err){
        console.log(err)
    }
}