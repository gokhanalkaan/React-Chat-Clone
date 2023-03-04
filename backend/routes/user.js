import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";

import {findUser} from "../controllers/user.js"

const router=express.Router();

router.get("/",verifyToken,findUser);






export default router;