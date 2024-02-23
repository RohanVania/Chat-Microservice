import express from 'express';
import { CLog } from './helper/AppHelper';
import cors from 'cors';
import fileupload from "express-fileupload"
import routes from './routes';
import { PrismaClient } from '@prisma/client';
import {initializingSocketServerOnThisServer} from "./socketServer"

if(!process.env.HTTP_PORT) {
    require('dotenv-flow').config()
}

if(process.env.SEEDCODE !== 'jurong2024') {
    CLog.bad("Start Server need correct env SEEDCODE!")
    process.exit(1)
}

export const prisma = new PrismaClient()

const SERVER_PORT = process.env.HTTP_PORT;

const app = express()
app.disable('x-powered-by')


app.use(express.json())

app.use('*', cors())
app.use(fileupload())
app.use('/', routes)


const server = app.listen(SERVER_PORT, () => {
    CLog.ok(`NODE_ENV is : ${process.env.NODE_ENV}.\n Express server has started on port ${SERVER_PORT}.`)
})

initializingSocketServerOnThisServer(server)

server.on('error', (err) => {
    CLog.bad(`Express server encountered an error: ${err}`);
})

