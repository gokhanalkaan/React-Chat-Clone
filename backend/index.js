import express from 'express'

import mongoose from 'mongoose'

import dotenv from 'dotenv'
import authRoutes from "./routes/auth.js"
import chatRoutes from "./routes/chat.js"
import messageRoutes from "./routes/message.js"
import userRoutes from "./routes/user.js"

import errorHandler from "./middlewares/errorHandler.js"

import cookieParser from "cookie-parser"

import cors from "cors"

import multer from 'multer'

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    
   
};



dotenv.config();


const app=express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });


app.post("/api/upload",upload.single("file"),(req,res)=>{

  console.log(req);

  try {
    const file=req.file;
   
   return res.status(200).json(file.filename);
    
  } catch (error) {

    next(error)
    
  }
})

app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);





const connect=() => {mongoose.connect(process.env.MONGO_URL).
then(()=> console.log("Connected to mongoose")).
catch((err)=> {throw err } );}



app.use(errorHandler);



app.listen(8800,()=>{
    connect();
    console.log("Backend server running ");
})