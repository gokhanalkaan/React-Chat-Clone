import React from 'react'
import styled from 'styled-components';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { red,blueGrey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { darkMode,lightMode } from '../utils/backgrounds';

const Container =styled.div`

height: 80px;
background-color: ${props =>props.bgMode ===true ? darkMode.chatNavbar:lightMode.chatNavbar};
display: flex;
justify-content: space-between;
align-items: center;


 
`;

const Username =styled.span`

 
    font-size: 14px;
    color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-left: 5px;

`;

const ChatIcons =styled.div`






 
`;

const ChatNavbar = () => {
  const darkMode= useSelector(state => state.darkMode.darkMode);

  const currentUserId = useSelector(state => state.auth.currentUser._id);
  const user = useSelector(state => state.chat.chatUser);
  

  
 // const friend= chat?.chatUsers?.find(user =>user.id!==currentUserId);
  return (
   <Container bgMode={darkMode}>
    <Username>{user.username}</Username>
    <ChatIcons>
       
            <VideoCameraFrontIcon style={{cursor:"pointer" ,marginRight:"5px",color:`${darkMode ? "#797e81" :"#5daf86"}`}}  fontSize='medium'/>

       
       
        <PersonAddIcon style={{cursor:"pointer" ,marginRight:"5px",  color:`${darkMode ? "#797e81" :"#5daf86"}`} }  fontSize='medium' />
        <TouchAppIcon style={{cursor:"pointer" ,marginRight:"5px",color:`${darkMode ? "#797e81" :"#5daf86"}`}} fontSize='medium'/>

    </ChatIcons>


   </Container>
  )
}

export default ChatNavbar