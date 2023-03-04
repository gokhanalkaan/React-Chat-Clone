import User from "../models/User.js";


export const findUser=async(req,res,next) =>{


    try {
        const user= await User.findOne({username:req.query.username});
 
        
        if(!user) return res.status(401).json("No user found");

        const {password,...others}=user._doc;

        

        return res.status(200).json(others);
        
    } catch (error) {
        next(error);
        
    }


  

    

}