import { Server } from "socket.io";
import { Server as HttpServer } from 'http';
import { disconnect } from "process";

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
        console.log("Client Connected to our Socket Server",socket.id)
        console.log(socket.handshake)
        socket.emit("hello","hi i am from server")
    
        
    //* Disconnection socket
        socket.on("disconnect",(reason)=>{
            console.log(reason)
        })
    })

    

}




// Comment Testing