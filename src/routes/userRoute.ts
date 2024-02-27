import express from "express"
import {getAllDoctors} from "../controller/GetUsersController"

const userRoute=express.Router();

userRoute.get('/doctors',getAllDoctors)

export default userRoute