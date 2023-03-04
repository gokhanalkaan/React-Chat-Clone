import Chat from "../models/Chat.js"


export const createChat = async(req,res,next) =>{

    

    if(req.user.id !== req.body.creatorUser.id) 
    return  res.status(401).json("You are not allowed do that");

   


  


    try {
       


       

       

        

        
//tekrar bak buraya query

        const conversation= await Chat.findOne({
            "chatUsers.id":{$all:[req.body.creatorUser.id,req.body.otherUser.id ]},
        });
        console.log(req.body.otherUser);


        

        

        if(!conversation){

            const newChat=  new Chat({
                chatUsers:[req.body.creatorUser,req.body.otherUser],
            });
    
            const savedChat= await newChat.save();

     
           return res.status(200).json(savedChat);


        }

        else{

          return  res.status(403).json("You have already this chat");

        }

       
        
    } catch (error) {
        next(error);
        
    }



}


export const getUserChat= async (req,res,next) => {
   

    if(req.user.id !== req.params.userId) return res.status(401).json("You are not allowed to do that");

    try {

        const chat= await Chat.find({"chatUsers.id":{
            $in:[req.params.userId],
        }});
        console.log(chat);

       return res.status(200).json(chat);
        
    } catch (error) {

        next(error);
        
    }




  
}