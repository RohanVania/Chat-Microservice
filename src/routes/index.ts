import {Router} from 'express'
import authRoute from "./authRoute"
import userRoute from "./userRoute"

const routes = Router()

// /api/messenger/user-register
routes.use('/api/messenger',authRoute)
routes.use('/api/users',userRoute)



export default routes