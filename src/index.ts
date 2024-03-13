import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { CLog } from './helper/AppHelper';
import fileupload from "express-fileupload"
import { PrismaClient } from '@prisma/client';
import routes from './routes';
import { initializingSocketServerOnThisServer } from "./socketServer"
import cloudinaryInitialize from "./config/cloudinaryConfig"


if (!process.env.HTTP_PORT) {
    require('dotenv-flow').config()
}

if (process.env.SEEDCODE !== 'jurong2024') {
    CLog.bad("Start Server need correct env SEEDCODE!")
    process.exit(1)
}

export const prisma = new PrismaClient()

const SERVER_PORT = process.env.HTTP_PORT;

const app = express()
app.disable('x-powered-by')

app.use(cookieParser())
app.use(express.json())
export const cloudinary = cloudinaryInitialize()

app.use('*', cors({
    origin:"*"
}))
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp"
    }
))
app.use('/', routes)


const server = app.listen(SERVER_PORT, () => {
    CLog.ok(`NODE_ENV is : ${process.env.NODE_ENV}.\n Express server has started on port ${SERVER_PORT}.`)
})

initializingSocketServerOnThisServer(server)

server.on('error', (err) => {
    CLog.bad(`Express server encountered an error: ${err}`);
})




