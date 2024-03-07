import express from "express"
import {RegisterUserOperation} from "../controller/auth/RegisterController"
import { LoginUserOperation } from "../controller/auth/LoginController";
const authRoute=express.Router();

authRoute.post('/user-register',RegisterUserOperation)
authRoute.post('/user-login',LoginUserOperation)




export default authRoute