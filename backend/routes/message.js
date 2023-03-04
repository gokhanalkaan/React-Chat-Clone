import express from "express";
import {createMessage,getChatMessages,updateMessageSeen} from "../controllers/message.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();


router.post("/",verifyToken,createMessage);
router.get("/:chatId",verifyToken,getChatMessages);
router.put("/:chatId",verifyToken,updateMessageSeen);


export default router;