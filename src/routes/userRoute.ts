import express from "express"
import {getAllDoctors,getAllPatients} from "../controller/users/GetUsersController"
import { authMiddleware } from "../middleware/authmiddleware";

const userRoute=express.Router();

userRoute.get('/doctors',authMiddleware,getAllDoctors);
userRoute.get('/patients',authMiddleware,getAllPatients);

export default userRoute