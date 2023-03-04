import React from 'react'
import styled from "styled-components";
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { blue,grey,red } from '@mui/material/colors';

const MessageContainer =styled.div`

display: flex;
margin-bottom: 18px;
 flex-direction: ${props=> props.from ==="me" && "row-reverse"};


align-items: center;
margin-left: 5px;

`;

const MessageInfo =styled.div`

display: flex;
flex-direction: column;
max-width: 65%;
padding: 20px;
border-radius:  0px 10px 10px 10px;
background-color:  ${props=> props.from ==="me" ? "#6AC2D8" :"white"};;
position: relative;
min-width: 77px;

`;

const ProfileImage =styled.img `
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;


const MessageTime=styled.span`
font-size: 14px;
color: #d6d6f7;
margin-right: 3px;

`;

const MessageBottom=styled.div`


position: absolute;
right: 7px;
bottom: 0px;
display: flex;
justify-content: space-evenly;
align-items: center;
`;



const MessageContent =styled.p`

max-width: max-content;
overflow-x:hidden;
overflow-wrap:anywhere;



font-size: 21px;


`;

const MessageImage=styled.img `


border-radius:  5px 5px 5px 5px;
object-fit: cover;
max-width: max-content;
max-height: max-content;




`;
const MessageImageContainer=styled.div `
background-color: transparent;
display: flex;
flex-direction: column;
position: relative;
max-width: 400px;
max-height: 300px;





`;



const Message = ({message}) => {

  const currentUser = useSelector(state => state.auth.currentUser);
  const friend = useSelector(state => state.chat.chatUser);


 // const img=false;
 // const message=false;
 

  return (
    <MessageContainer from={message.senderId === friend.id ?'other':"me"} >
      
        <ProfileImage src={message.senderId === friend.id ?friend.profilePhoto:currentUser.profilePhoto}  />
    
       
       
      { (message.messageContent?.length>0 && message.photoUrl?.length>0) ?

       <div style={{display:"flex", flexDirection:"column",maxHeight:"700",maxWidth:"401"
      
      
      
      }}> 



       <MessageImageContainer>
        <MessageImage src={`../upload/${message.photoUrl}`}/>
        
      </MessageImageContainer> 







      <MessageInfo from={message.senderId === friend.id ?'other':"me"}>
       
      <MessageContent>{message.messageContent}</MessageContent>
      <MessageBottom>
    
      <MessageTime>{<ReactTimeAgo date={message.createdAt} locale="en-US"/>}</MessageTime>
       { message.senderId !== friend.id && <div> 
       {  message.seen ===true ?<DoneAllIcon sx={{color:blue[800]}}  fontSize='small' />:<RemoveDoneIcon sx={{color:grey[900]}}  fontSize='small'/>}
       </div>}
      </MessageBottom>
      
        
      </MessageInfo>




      </div>:(message.photoUrl?.length >0 && message.messageContent?.length===0) ?<MessageImageContainer>
      <MessageImage src={`../upload/${message.photoUrl}`}/>
      <MessageTime>3 minutes ago</MessageTime>
    </MessageImageContainer> :

(message.photoUrl?.length===0&& message.messageContent?.length>0) &&<MessageInfo from={message.senderId === friend.id ?'other':"me"}>
       
    <MessageContent>{message.messageContent}</MessageContent>
    <MessageBottom>
  
    <MessageTime>{<ReactTimeAgo date={message.createdAt} locale="en-US"/>}</MessageTime>
     { message.senderId !== friend.id && <div> 
     {  message.seen ===true ?<DoneAllIcon sx={{color:blue[800]}}  fontSize='small' />:<RemoveDoneIcon sx={{color:grey[900]}}  fontSize='small'/>}
     </div>}
    </MessageBottom>
    
      
    </MessageInfo>
    
    
    }



      
      
      
 
    </MessageContainer>
    
  )
}

export default Message