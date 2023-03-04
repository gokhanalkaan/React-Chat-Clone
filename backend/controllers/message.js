import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const createMessage = async (req, res, next) => {

  if (req.user.id !== req.body.senderId) return res.status(401).json("You are not allowed do that");
  try {
    
    

    const newMessage = new Message({ ...req.body });

    const savedMessage = await newMessage.save();

    await Chat.findByIdAndUpdate(req.body.chatId,{
        $set:{lastMessage:req.body.messageContent}
    });



    return res.status(200).json(savedMessage);
  } catch (error) {
    next(error);
  }
};



export const getChatMessages=async(req,res,next)=>{
  


  try {

    const messages= await Message.find({chatId:req.params.chatId,});
    console.log(messages)
    return res.status(200).json(messages);
    
  } catch (error) {
    return res.status(500).json(error);
    
  }


}



export const updateMessageSeen=async(req,res,next)=>{





  try {


    

    
    
 await Message.updateMany({chatId:req.params.chatId,senderId:req.body.friendId,seen:false},{$set:{seen:true}},{new:true});
    
   
    
    
  } catch (error) {
    next(error);
    
  }


}

