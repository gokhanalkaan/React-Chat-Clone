import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import {useSelector,useDispatch} from  "react-redux";
import {updateCurrentChat} from "../redux/chatRedux";
import { updateMessageSeen } from '../redux/apiCalls';
import { darkMode,lightMode } from '../utils/backgrounds';



const Container =styled.div`
display: flex;
margin-top: 10px;
margin-left: 2px;
align-items: center;
position: relative;

cursor: pointer;
&:hover{
    background-color: ${props =>props.bgMode ===true ? darkMode.chatHover:lightMode.chatHover};


}




 
`;

const ChatUserPhoto=styled.img`
height: 42px;
width: 42px;
border-radius: 50%;
object-fit: cover;


`;


const ChatUserInfo =styled.div`
margin-left: 10px;


`;


const Username =styled.span`
    color: #F2F0F3;
    font-size: 20px;
    font-weight: bold;

`;



const LastMessage =styled.p`
   
    color: rgb(180, 180, 181);
    overflow:hidden;
  
`;

const Online=styled.div`
height: 16px;
width: 16px;
border-radius: 50%;
position: absolute;
background-color: #39c939;
top: 1px;
right: 5px;

`;


const ChatUser = ({chat}) => {
  
    const currentUserId = useSelector(state => state.auth.currentUser._id);
    const dispatch=useDispatch();
    //const [otherUserInfo,setOtherUserId]=useState("");
    const socket=useSelector(state => state.socket.socket)
    const [onlineUsers,setOnlineUsers]=useState([]);
    const [online,setOnline]=useState(false);
    const darkMode= useSelector(state => state.darkMode.darkMode);




   const friend= chat?.chatUsers.find(user =>user.id!==currentUserId);

   useEffect(() => {
    socket?.current.on("getUsers",users =>{

       setOnlineUsers(users);
       
      })
   
   }, [socket,currentUserId])


   useEffect(() => {
    if(onlineUsers){
        onlineUsers.find(u => u.userId===friend.id) ?setOnline(true) :setOnline(false)
    }
   }, [onlineUsers,friend.id])
   
   

   


   const handleChatClick =async()=>{

    //const chatId=chat._id;
    
    
   
    dispatch(updateCurrentChat({chatId:chat._id,friend}));

    updateMessageSeen(chat._id,friend.id)




   }

  
  return (
    
    <Container bgMode={darkMode} onClick={handleChatClick}>
        <ChatUserPhoto src={`${friend.profilePhoto?friend.profilePhoto:"https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}`}/>
        <ChatUserInfo>
            <Username>{ 
            friend.username  }</Username>
            <LastMessage>{chat?.lastMessage.length >39 ? chat.lastMessage.substring(0,35)+"...":chat.lastMessage}</LastMessage>
        </ChatUserInfo>
        {
            online && <Online/>
        }

     
    </Container>
  )
}

export default ChatUser