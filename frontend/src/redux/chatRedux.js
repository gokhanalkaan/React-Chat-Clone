import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChatId:null,
  chatUser:{},
  chats:[]
  
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getAllChats: (state,action) => {
      state.chats = action.payload;
    },
    addChat: (state,action) => {
      state.chats = [...state.chats,action.payload];
    },
    updateCurrentChat:(state,action) =>{

      console.log(action.payload)

      state.currentChatId=action.payload.chatId;
      state.chatUser=action.payload.friend;

     

    

   
  },

   updateLastMessage:(state,action)=>{

    
     state.chats.find(c=> c._id=== action.payload.id).lastMessage=action.payload.lastMessage;

   
   
   /*const otherchats=  state.chats.filter(c=> c._id !== action.payload.id);

  
   chat.lastMessage=action.payload.lastMessage;

   

   state={...state,chats:[...otherchats,chat]}*/


   



  }
}});

// Action creators are generated for each case reducer function
export const { getAllChats,addChat,updateCurrentChat,updateLastMessage } = chatSlice.actions;
export default chatSlice.reducer;
