import express from "express";
const router=express.Router();


import { isauthenticated } from "../middlewares/authMiddleware.js";
import  {sendMessage,getMessages}  from "../controllers/messageController.js";

router.post("/send/:receiverId",isauthenticated,sendMessage);


router.get("/getmessages/:otherParticipantId",isauthenticated,getMessages);


export default router;

