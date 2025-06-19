import Message from '../models/messageModel.js';
import Conversation from '../models/conversationModel.js';
import { asyncHandler } from '../utilities/asynchandler.js';
import { errorHandler } from '../utilities/errorHandler.js';
import { io } from '../socket/socket.js'; 
import { getSocketId } from '../socket/socket.js';
export  const sendMessage = asyncHandler(async (req, res, next) => {
    console.log("send message");
  
    const senderId=req.userId;
    const receiverId=req.params.receiverId;
    const { message } = req.body;
    console.log(senderId,receiverId,message);
    
  
    if(!senderId||!receiverId||!message){
        return next(new errorHandler("All fields are required",405));
    }

    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId] }}
    );

    if(!conversation){
        conversation=await Conversation.create({participants:[senderId,receiverId]});
        
    }
    const newMessage=await Message.create({
       senderId,
       receiverId,
        message
    })

    if(newMessage){
         conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    //socket.io
    const socketId = getSocketId(receiverId);
    io.to(socketId).emit("newMessage",newMessage);


    res.status(200).json({
        success: true,
        message: "Message sent successfully",
        responseData: newMessage
    });

});

export  const getMessages = asyncHandler(async (req, res, next) => {
   
  
    const myId=req.userId;//harsh
    const otherParticipantId=req.params.otherParticipantId;//vishal

   
    
  
    if(!myId||!otherParticipantId){
        return next(new errorHandler("All fields are required",405));
    }

    let conversation=await Conversation.findOne({
        participants:{$all:[myId,otherParticipantId] }
    }).populate('messages');


  
    res.status(200).json({
        success: true,
        responseData: conversation
    });



});