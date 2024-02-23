import {Router} from 'express'
import authRoute from "./authRoute"

const routes = Router()

// /api/messenger/user-register
routes.use('/api/messenger',authRoute)



export default routes