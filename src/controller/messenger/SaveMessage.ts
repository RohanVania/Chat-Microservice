import { Request, Response } from "express"
import { cloudinary, prisma } from "../../index"

export interface IGetUserAuthInfoRequest extends Request {
    userID?: number // or any other type
}


export const SaveMessage = async (req: IGetUserAuthInfoRequest, resp: Response) => {
    try {
        // console.log(req.files);
        // console.log("Hello", req?.userID)
        const { senderName, senderId, receiverId, receiverName, receiverEmail, message } = req.body;
        // console.log(senderName,senderId,receiverId,receiverName,receiverEmail,message);
        let file: any = req.files;

        if (!senderName || !senderId || !receiverId || !receiverName || !receiverEmail || !message) {
            return resp.status(422).json({
                status: 'Failed',
                message: 'Missing some fields while sending message'
            })
        }

        if (file) {
            const res = await cloudinary.uploader.upload(file.image.tempFilePath,
                {
                    folder: "/RegisterUser",
                    resource_type: "auto"
                }
            )
            file = res.secure_url
        }

        const messageCreated = await prisma.message.create({
            data: {
                senderId: +senderId,
                senderName: senderName,
                receiverId: +receiverId,
                receiverName: receiverName,
                receiverEmail: receiverEmail,
                message: message,
                image: file ? file : null
            }
        })

        // console.log(messageCreated);

        return resp.status(200).json({
            status: 'Success',
            message: message,
            data: messageCreated
        })

    } catch (err) {
        console.log(err)
        return resp.status(500).json({
            status: "Something went wrong",
            data: err
        })
    }

}

export const GetAllMessages = async (req: IGetUserAuthInfoRequest, resp: Response) => {
    try {
        console.log("Let Retrieve Messsage for that particular User who Id ", req.params?.currentChatUser);

        const senderId = req.userID;
        const receiverId = req.params?.currentChatUser;

        if (!senderId || !receiverId) {
            return resp.status(404).json({
                status: 'Failed',
                msg: 'Missing sender or receiver id'
            })
        }

        const messageResult = await prisma.message.findMany({
            where: {
                OR:[
                    {
                        senderId:+senderId,
                        receiverId:+receiverId
                    },
                    {
                        senderId:+receiverId,
                        receiverId:+senderId
                    }
                ]
            
            } 
        })

        // console.log(messageResult);

        resp.status(200).json({
            status: 'Ok',
            data:messageResult,
            message: messageResult.length===0?'No messages between this two users':messageResult
        })
    } catch (err) {
        console.log(err)
    }
}