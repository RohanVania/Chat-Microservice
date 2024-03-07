import {Router} from 'express'
import authRoute from "./authRoute"
import userRoute from "./userRoute"
import messengerRoute from './messengerRoute'


const routes = Router()

// /api/messenger/user-register
routes.use('/api/auth',authRoute)
routes.use('/api/users',userRoute)
routes.use('/api/messenger',messengerRoute)




export default routes