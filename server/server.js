import {app,server} from "./socket/socket.js"; // Importing the socket server

import express from "express";

import { connectDB } from "./db/connection1db.js";
import cookieParser from "cookie-parser";


connectDB();
import cors from "cors";


const port=process.env.PORT;


import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
//routes
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true  // enable setting cookies in the response
  
}));
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

import {errorMiddleware}  from "./middlewares/errorMiddleware.js";
app.use(errorMiddleware);

server.listen(port,()=>{
 console.log("your server is listening at port 5000");

})