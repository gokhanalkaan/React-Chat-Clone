import React,{useEffect, useRef} from 'react'

import ChatUser from './ChatUser';
import {useSelector,useDispatch} from  "react-redux";

import { getUserChat } from '../redux/apiCalls';
import { addSocket } from '../redux/socketRedux';
import {io} from "socket.io-client"








const Chats = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const socket = useRef();
  const allChats = useSelector(state => state.chat.chats);
  

  //const [socket,setSocket]=useState(null);


 
  
  console.log(allChats);
 const dispatch=useDispatch();


 useEffect(() => {
   socket.current=io("ws://localhost:8900")
   dispatch(addSocket(socket));
  
 }, [dispatch])
 

 

useEffect(() => {
  socket?.current.emit("addUser", currentUser._id);
  
  socket?.current.on("getUsers",users =>{

    console.log(users)
   
  })

  
  
}, [currentUser]) 

  

  useEffect(() => {


      getUserChat(dispatch,currentUser._id);

 

       

  }, [currentUser,dispatch]);
  


  return (
    <div >

      {
        allChats.map((chat,index) =>( 
        <ChatUser key={index}  chat={chat}/>
      
        ))
      }
       
      
        
     
      


    </div>
    
    

  )
}

export default Chats