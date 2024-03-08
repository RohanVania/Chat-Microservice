
import { Router } from "express"; 
import { SaveMessage } from "../controller/messenger/SaveMessage";
import { authMiddleware } from "../middleware/authmiddleware";
import { GetAllMessages } from "../controller/messenger/SaveMessage";


const messengerRoute=Router();

messengerRoute.post('/savemessage',authMiddleware,SaveMessage)
messengerRoute.get('/getAllMessages/:currentChatUser',authMiddleware,GetAllMessages);


export default messengerRoute