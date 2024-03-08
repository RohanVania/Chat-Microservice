import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"


export interface IGetUserAuthInfoRequest extends Request {
    userID?: number // or any other type
  }

export const authMiddleware = async (req:IGetUserAuthInfoRequest , resp: Response, next: NextFunction) => {
    try {
        const {AuthToken}=req.cookies;
        if(!AuthToken){
            return resp.status(400).json({
                status:'Failed',
                msg:'No Token'
            })
        }
        const secret=process.env.JWT_TOKEN_SECRET
        const decode:any=jsonwebtoken.verify(AuthToken,`${secret}`);        
        req.userID=decode.id;
        next();
    } catch (err) {
        console.log(1);
            console.log(err)
    }
}