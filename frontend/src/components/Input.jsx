import React, { useState } from 'react'
import styled from "styled-components";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/apiCalls';

const InputContainer =styled.div`
width: 100%;
display: flex;
align-items: center;
height: 80px;





 
`;

const MessageInput=styled.input`

height: 100%;
width: 80%;
border: none;
outline: none;
color: #2f2d52;
          font-size: 18px;
          align-items: center;

&::placeholder {
    color: rgb(175, 175, 175);
    
 }

`;


const IconContainer =styled.div`



height:100%;
width: 20%;
justify-content: space-around;
align-items: center;
display: flex;




 
`;

const Button =styled.button`








 
`;





const Input = () => {
  const [message,setMessage]=useState("");
  const currentUser = useSelector(state => state.auth.currentUser);

  const dispatch=useDispatch();
  const friend = useSelector(state => state.chat.chatUser);
  const chatId = useSelector(state => state.chat.currentChatId);

  const handleSendMessage=()=>{

    const newMessage={
      senderId:currentUser._id,
      receiverId:friend.id,
      chatId,
      messageContent:message

    }

    console.log(newMessage);
    sendMessage(newMessage,dispatch);
    setMessage("");

  }
  return (
    <InputContainer>
        <MessageInput value={message} onChange={e=> setMessage(e.target.value)} placeholder='Type Something'/>
        <IconContainer>

            
                <AttachFileIcon />

       

         
                <InsertPhotoOutlinedIcon/>
                <SendIcon style={{cursor:"pointer"}} onClick={handleSendMessage}/>


                
           
                
            
            

            
           
         


        </IconContainer>

    </InputContainer>
  )
}

export default Input