import User from '../models/userModel.js';
import { asyncHandler } from '../utilities/asynchandler.js';
import { errorHandler } from '../utilities/errorHandler.js';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register=asyncHandler(async(req,res,next)=>{
   
     const {fullName,username,password,gender}=req.body;

        if(!fullName ||!username ||!password ||!gender){
           return next(new errorHandler("All fields are required",405));
         }

        const user=await User.findOne({username});

        if(user){
            return next(new errorHandler("Username already exists",409));
        }


        //encryption of password
        const hashedPassword=await bcrypt.hash(password,10);

        const avatarType= gender==="male" ?"boy":"girl";
        const avatar=`https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

        const newUser=await User.create({fullName,username,password:hashedPassword,gender,avatar});


        const tokenData={
            _id:newUser._id  
        }

        const token=jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});

        res
        .status(201)
        .cookie('token',token,{expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000),httpOnly:true,
         secure:true,
         sameSite:"None"
         
        })
        .json({
            success:true,
           responseData:{
            newUser, 
            token
           }
        });
      

});

export const login=asyncHandler(async(req,res,next)=>{
   
     const {username,password}=req.body;

        if(!username ||!password ){
           return next(new errorHandler("All fields are required",405));
         }

        const user=await User.findOne({username});

        if(!user){
            return next(new errorHandler("User not exists",409));
        }
   
        //decrypting password
        //compare the password with the hashed password in the database
        const isValidPassword=await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            return next(new errorHandler("Invalid password",401));
        }

        const tokenData={
            _id:user._id  
        }

        const token=jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});

        res
        .status(201)
        .cookie('token',token,{expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true,
         secure:true,
         sameSite:"None",      
        })
        .json({
            success:true,
           responseData:{
            user, 
            token
           }
        });

        

});

export const getProfile=asyncHandler(async(req,res,next)=>{
   
    const userId=req.userId;

   console.log(userId);

   const profile=await User.findById(userId);

   res.status(200).json({
    success:true,
    responseData:profile,
   })
});


export const logout=asyncHandler(async(req,res,next)=>{
   

   res
   .status(200)
    .cookie('token',"",{expires:new Date(Date.now()),httpOnly:true })
   .json({
    success:true,
    message:"Logged out successfully"
    
   })

});

export const getOtherUsers=asyncHandler(async(req,res,next)=>{
   
    const otherUsers=await User.find({_id:{$ne:req.userId}});

   res
   .status(200)
   .json({
    success:true,
   responseData:otherUsers,
   });

});



// export const fxn1=(req,res,next)=>{
//  console.log("Hello i am fxn1");
//  next();
// };

// export const fxn2=(req,res,next)=>{
//     console.log("Hello i am fxn2");
//     next();
// };