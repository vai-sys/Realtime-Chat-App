import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`client disconnected ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId); 
                break;
            }
        }
    };

   
    // const sendMessage = async (message) => {
    //     const senderSocketId = userSocketMap.get(message.sender); 
    //     const recipientSocketId = userSocketMap.get(message.recipient); 
    //     const createdMessage = await Message.create(message);
    
    //     const messageData = await Message.findById(createdMessage._id)
    //         .populate("sender", "_id email firstName lastName image color")
    //         .populate("recipient", "_id email firstName lastName image color");
    
    //     if (recipientSocketId) {
    //         io.to(recipientSocketId).emit("receivedMessage", messageData);
    //     }
    
    //     if (senderSocketId) {
    //         io.to(senderSocketId).emit("receivedMessage", messageData);
    //     }
    // };

    const sendMessage = async (message) => {
        console.log("Message received from sender:", message);  
      
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);
        const createdMessage = await Message.create(message);
      
        const messageData = await Message.findById(createdMessage._id)
          .populate("sender", "id email firstName lastName image color")
          .populate("recipient", "id email firstName lastName image color");
      
        console.log("Message stored in DB and populated:", messageData); 
      
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receivedMessage", messageData);
          console.log(`Message sent to recipient: ${recipientSocketId}`);
        }
      
        if (senderSocketId) {
          io.to(senderSocketId).emit("receivedMessage", messageData);
          console.log(`Message sent to sender: ${senderSocketId}`);
        }
      };
      
    


    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId; 

        if (userId) {
            userSocketMap.set(userId, socket.id); 
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
            console.log("User ID not provided during connection");
        }

      
        socket.on("sendMessage", sendMessage);

        socket.on("disconnect", () => disconnect(socket));
    });
};

export default setupSocket;
