import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import mongoose from "mongoose";


export const register =async (req,res,next) =>{

    try {

        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
    } catch (error) {


        next(error);
        
    }

  

    


};


export const login =async (req,res,next) =>{

    try {

        const user=await User.findOne({username:req.body.username});

        if(!user)
        return res.status(404).json("No user found");

        const userPassword=req.body.password;

      const isCorrect= await bcrypt.compare(userPassword,user.password);

      if(!isCorrect) return res.status(401).json("Wrong password");


      const token=jwt.sign({id:user._id},process.env.JWT_SIGN);

      const{password,...others}=user._doc;

     // res.setHeader('Set-Header',`access_token=${token}`);

      res.cookie("access_token",token,{httpOnly:true,}).status(200).json(others);
      console.log(token);

     return res.status(200).json(others);



      
    } catch (error) {


        next(error);
        
    }

  
  

    


};

export const logOut=async(req,res,next)=>{

    res.clearCookie("access_token",{sameSite:"none",secure:true}).status(200).json("User logged out");

}
