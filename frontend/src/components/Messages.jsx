import React, { useState,useEffect, useRef,componentDidMount} from 'react'
import styled from "styled-components";
import Message from './Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, updateMessageSeen,uploadFile } from '../redux/apiCalls';
import { getChatMessages } from '../redux/apiCalls';
import { darkMode,lightMode } from '../utils/backgrounds';

import  {addChat, updateLastMessage}  from "../redux/chatRedux";
import InsertPhotoOutlined from '@mui/icons-material/InsertPhotoOutlined';


const Container =styled.div`

width: 100%;


height: calc(100% - 160px);
background-color: ${props =>props.bgMode ===true ? darkMode.messages:lightMode.messages};





 
`;




const Wrapper=styled.div `

overflow-y: scroll;
width: calc(100%-10px);
height: 100%;


&::-webkit-scrollbar{

width: 10px;

}


&::-webkit-scrollbar-track{

background-color: #dfd7d7;

}

&::-webkit-scrollbar-thumb{

background-color: #746f6f;

}
`;

///////////////

const InputContainer =styled.div`
width: 100%;
display: flex;
align-items: center;
height: 80px;
background-color: ${props =>props.bgMode ===true ? darkMode.messageInput:lightMode.messageInput};



 
`;

const MessageInput=styled.input`

height: 100%;
width: 80%;
border: none;
outline: none;
color: ${props =>props.bgMode ===true ? "white":"black"};
          font-size: 18px;
          align-items: center;
          background-color: ${props =>props.bgMode ===true ? darkMode.messageInput:lightMode.messageInput};

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


const TypingMessage =styled.p`
text-align: center;
color: white;
position: sticky;







 
`;





const Messages = () => {

  const currentChatId = useSelector(state => state.chat.currentChatId);
  console.log(currentChatId);
  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(false);
  const [msgRead,setMsgRead]=useState(null);
  const [file, setFile] = useState(null);
  const scrollRef=useRef();
  const socket=useSelector(state => state.socket.socket)
  const darkMode= useSelector(state => state.darkMode.darkMode);


//console.log(messages)
console.log(msgRead);


 

  const [message,setMessage]=useState("");
  const [arrivalmessage,setArrivalmessage]=useState(null);
  const [typing,setTyping]=useState(null);
  const [sendtyping,setSendtyping]=useState(false);
  const currentUser = useSelector(state => state.auth.currentUser);


  const dispatch=useDispatch();
  const friend = useSelector(state => state.chat.chatUser);

  const allChats = useSelector(state => state.chat.chats);
//  const chatId = useSelector(state => state.chat.currentChatId);


  const handleEnterPress = e => e.code === "Enter" && handleSendMessage()
  

const handleKeyPress=  e => {

  

setSendtyping(true);
if(sendtyping ){
  

  socket.current.emit("typing",{
    senderId:currentUser._id,
    receiverId:friend.id,
    writerUsername:currentUser.username,
    text:e.target.value
   
  })


  return () => {
   setSendtyping(false);
};

}



}



  

  const handleSendMessage=async(e)=>{
    

   
  

    

    let res;

    if(file){
      e.preventDefault();
     
      
     res=await uploadFile(file)

    
     
     console.log(res);
    }

    if(message.length>0 || res!=null){

    const newMessage={
      senderId:currentUser._id,
      receiverId:friend.id,
      chatId:currentChatId,
      messageContent: message?.length>0  ? message: "",
      photoUrl:res?.data? res.data : "" 


    }

   // console.log(newMessage);
   await sendMessage(newMessage,dispatch);
    setMessages([...messages,{
      senderId:currentUser._id,
      receiverId:friend.id,
      chatId:currentChatId,
      messageContent:message.length>0 ? message:"",
      seen:false,
      photoUrl:res?.data ? res.data :"",
      createdAt:Date.now()
    

    }]);

    socket?.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId:friend.id,
      message: newMessage.messageContent,
      chatId:currentChatId,
      photoUrl:res?.data ? res.data :"",
      profilePhoto:currentUser.profilePhoto,
      username:currentUser.username
    });
  
 
    setMessage("");

   if(file!==null) setFile(null);
    
   setSendtyping(false);
   setMsgRead(null);



  }

    
  
   

  }

  

  useEffect(() => {
    
    
    const getMessages= async ()=>{

      console.log("getMessages worked");

      setLoading(true)
     

      
        const res=await  getChatMessages(currentChatId);
        if(res)  
        {
          console.log("getMessages return answer");
          setMessages(res);
          setLoading(false)
          socket?.current.emit("sendMsgReadInfo",{
            msgSenderId:friend.id,
            msgReaderId:currentUser._id
            
      
          });


        }  
        else{
          setMessages([])
          setLoading(false)

        }
      
    

       
        
      
   


    }
       getMessages();
   


  
   
  }, [currentChatId,socket,currentUser._id,friend.id])

  useEffect(() => {
    socket?.current.on("getMessage",(data)=>{
 
   
    setArrivalmessage({

      senderId:data.senderId,
      receiverId:currentUser._id,
      chatId:data.chatId,
      seen:false,
     
      messageContent:data.message,
      photoUrl:data.photoUrl,
      profilePhoto:data.profilePhoto,
      username:data.username,
      
      createdAt: Date.now()
    });
 

    })
 


   
  
    
  }, [currentUser._id,socket])

 useEffect(() => {
    socket?.current.on("gettyping",(data)=>{
 
 
   
      if(data && data.senderId === friend.id && data.text.length>0 )
      setTyping(data)

      else setTyping(null)

     
      })
  
    
  }, [socket,friend.id])

 

  useEffect(() => {
 
    

    if(arrivalmessage){

      if(arrivalmessage.senderId===friend.id){
        setArrivalmessage((prev) =>({...prev,seen:true}))

        //delete arrivalmessage.chatId;
      setMessages([...messages,arrivalmessage]);
      
  
  



    socket?.current.emit("sendMsgReadInfo",{
      msgSenderId:arrivalmessage.senderId,
      msgReaderId:currentUser._id
      

    });

    updateMessageSeen(currentChatId,friend.id);

    
    dispatch(updateLastMessage({id:currentChatId,lastMessage:arrivalmessage.messageContent}));
 
      setArrivalmessage(null);
      setTyping(null);


     




      }


      else{

       let usr= allChats.find((u)=>u.chatUsers.some(b=> b===arrivalmessage.senderId))


       if(!usr){
        dispatch(addChat({
          _id:arrivalmessage.chatId,
          chatUsers:[
            {id:arrivalmessage.senderId,
              username:arrivalmessage.username,
              profilePhoto:arrivalmessage.profilePhoto
            
            },
           {...currentUser}
          ],
          lastMessage:arrivalmessage.messageContent,
          createdAt:Date.now()

        }));
      }
      








      }
      


     
   


    }

    
  

   
  }, [arrivalmessage,friend.id,messages,socket,currentUser._id,currentChatId,dispatch])

  useEffect(() => {
    socket?.current.on("getMsgReadInfo",(data)=>{


      setMsgRead(data)
 
 
   
      

     
      })
  
    
  }, [socket,])

  useEffect(() => {
    

    if(msgRead && msgRead.msgReaderId === friend.id  ){
     
    //  messages.filter(msg => msg.read === false).forEach(m => m.read=true )

    const updatedMessages = messages.map(obj => {
      
      if (obj.seen === false) {
        return {...obj, seen:true};
      }

      // 👇️ otherwise return object as is
      return obj;
    });
    console.log(updatedMessages)

    setMessages(updatedMessages)
    
    setMsgRead(null)


   
 
    
  

     

    }

   

    console.log(messages);
     
  
   
   
  }, [msgRead,friend.id,messages])
  


  
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
 
  
    
  }, [messages])


 

 console.log(file)
  


  
  
  return (
   <Container bgMode={darkMode}>
    {typing &&    <TypingMessage>{typing.message}</TypingMessage>}
 
    <Wrapper>
       
          
          {

           !loading ? messages?.map((m,index) => (
                <div ref={scrollRef}>
              
                  <Message key={index+1} message={m}/>

              </div>
              
              )):<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}><CircularProgress/></div>
        }

      
     



    
        
      
       
    </Wrapper>

    <InputContainer bgMode={darkMode}>
        <MessageInput bgMode={darkMode} onKeyUp={handleKeyPress} onKeyPress={handleEnterPress}  value={message} onChange={e=> setMessage(e.target.value)} placeholder='Type Something'/>
        <IconContainer>

            
                <AttachFileIcon style={{cursor:"pointer",color:"#797e81"}} />

       


                <label htmlFor='file'> 
                <InsertPhotoOutlinedIcon   style={{cursor:"pointer",color:"#797e81"}}/>
                </label>
         
               
               <input style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])} type="file" id='file'></input>

                
                  

                <SendIcon style={{cursor:"pointer",color:"#797e81"}} onClick={handleSendMessage}/>


                
           
                
            
            

            
           
         


        </IconContainer>

    </InputContainer>
    
   </Container>
  )
}

export default Messages