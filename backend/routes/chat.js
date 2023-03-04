import express from "express";
import {createChat,getUserChat} from "../controllers/chat.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();


router.post("/",verifyToken,createChat);
router.get("/:userId",verifyToken,getUserChat);



export default router;