import express from "express"
import {RegisterUserOperation} from "../controller/auth/RegisterController"
import { LoginUserOperation,LogoutUserOperation} from "../controller/auth/LoginController";
const authRoute=express.Router();

authRoute.post('/user-register',RegisterUserOperation)
authRoute.post('/user-login',LoginUserOperation)
authRoute.get('/user-logout',LogoutUserOperation)



export default authRoute