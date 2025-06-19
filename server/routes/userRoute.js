import express from "express";
const router=express.Router();

import {login,register,getProfile,logout,getOtherUsers } from "../controllers/userController.js";
import { isauthenticated } from "../middlewares/authMiddleware.js";

router.post("/register",register);
router.post("/login",login);
router.get("/getprofile",isauthenticated,getProfile);
router.post("/logout",isauthenticated,logout);
router.get("/getotherusers",isauthenticated,getOtherUsers);

export default router;