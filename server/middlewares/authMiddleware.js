import { asyncHandler } from "../utilities/asynchandler.js";
import { errorHandler } from "../utilities/errorHandler.js";
import jwt from "jsonwebtoken";
export const isauthenticated=asyncHandler(async(req,res,next)=>{
   
    const token=req.cookies?.token || req.headers["authorization"]?.replace("Bearer ","");

    console.log(token);
    console.log("vj");

     if(!token){
         return next(new errorHandler("Token not found",401));
     }  

    const tokenData=jwt.verify(token,process.env.JWT_SECRET); 
    console.log(tokenData);
    req.userId=tokenData._id;
    console.log(req.userId);
    next();

});
