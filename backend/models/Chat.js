import mongoose  from "mongoose";


const ChatSchema=new mongoose.Schema(
{

    chatUsers:{
        type:Array,
    },
    lastMessage:{
        type:String,
        default:"",
    }
    
    


},
{timestamps:true}
);

export default mongoose.model("Chat", ChatSchema);