import mongoose  from "mongoose";


const MessageSchema=new mongoose.Schema(
{

   senderId:{
    type:String,
   },
   receiverId:{
    type:String,
   },

   chatId:{
    type:String,
   },

   messageContent:{
    type:String
   },
   seen:{
      type:Boolean,
      default:false
   },
   photoUrl:{
      type:String,

   }
    


},
{timestamps:true}
);

export default mongoose.model("Message", MessageSchema);