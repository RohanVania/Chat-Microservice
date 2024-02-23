import { Server } from "socket.io";
import { Server as HttpServer } from 'http';

let expressServer: HttpServer | undefined;

//** Initializing the Socket Server */
export function initializingSocketServerOnThisServer(server: HttpServer) {
    expressServer = server;
    //**Configuring the Socket Server */
    const io = new Server(expressServer, {
        cors: {
            origin: "*"
        }
    });


    //* This is for main namespace
    io.on('connection', (socket) => {
        console.log("Client Connected to our Socket Server")
    })

}




// Comment Testing