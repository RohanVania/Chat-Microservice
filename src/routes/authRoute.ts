import express from "express"
import {RegisterUserOperation} from "../controller/RegisterController"

const authRoute=express.Router();

authRoute.post('/user-register',RegisterUserOperation)

export default authRoute