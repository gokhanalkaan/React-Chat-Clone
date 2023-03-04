//import { BASE_URL, publicRequest } from "../requestMethods";
import axios from "axios";
import { loginFail, loginStart, loginSuccess,logout } from "./authRedux";
import { getAllChats, addChat,updateLastMessage } from "./chatRedux";

const BASE_URL="http://localhost:8800/api";

//${BASE_URL}

export const login=async(dispatch,user)=>{

    dispatch(loginStart());

    try {
        const res=await axios.post(`${BASE_URL}/auth/login`,user,{withCredentials: true, credentials: 'include'});
        dispatch(loginSuccess(res.data));
        console.log(res.data)
        
    } catch (error) {
        dispatch(loginFail());
        
    }



}


export const logOut=async(dispatch)=>{

 

    try {

        dispatch(logout())
        const res=await axios.post(`${BASE_URL}/auth/logOut`,{},{withCredentials: true, credentials: 'include'});
     console.log(res);
    } catch (error) {
        console.log(error);
        
        
    }



}

export const getUserChat=async(dispatch,currentUserId)=>{
    

    try {
        const res=await axios.get(`${BASE_URL}/chat/${currentUserId}`,{withCredentials: true, credentials: 'include'});

        dispatch(getAllChats(res.data));
        console.log(res.data);
        
    } catch (error) {
        console.log(error);
        
    }

}


export const searchUser=async(username) =>{

    try {
        const data= await  axios.get(`${BASE_URL}/users?username=${username}`,{withCredentials: true, credentials: 'include'});

        return data;
    } catch (error) {
        
    }


}


export const addUser=async(currentUser,foundedUser,dispatch) =>{

   const creatorUser={
        id:currentUser._id,
        username:currentUser.username,
        profilePhoto:currentUser.profilePhoto
    };

    const otherUser={
        id:foundedUser._id,
        username:foundedUser.username,
        profilePhoto:foundedUser.profilePhoto




    }

    const chatUsers={
       creatorUser,
        otherUser
    }


    try {
        const res=await axios.post(`${BASE_URL}/chat`,chatUsers,{withCredentials: true, credentials: 'include'});
      
        dispatch(addChat(res.data))
      
    } catch (error) {
        console.log(error);
        
    }


}


export const getChatMessages=async(chatId) =>{

    try {
        const res= await  axios.get(`${BASE_URL}/message/${chatId}`,{withCredentials: true, credentials: 'include'});

        console.log("res has taken")
        return res?.data;
    } catch (error) {
        
    }


}

export const sendMessage=async(message,dispatch) =>{

    try {
       


  await  axios.post(`${BASE_URL}/message`,message,{withCredentials: true, credentials: 'include'});

        dispatch(updateLastMessage({id:message.chatId,lastMessage:message.messageContent}));
       

    
    } catch (error) {
        
    }


}


export const updateMessageSeen=async(chatId,friendId) =>{

    try {
       
        await  axios.put(`${BASE_URL}/message/${chatId}`,{friendId:friendId},{withCredentials: true, credentials: 'include'});

        
       


  

    
    } catch (error) {
        
    }


}


export const uploadFile=async(file) =>{
   

    console.log(file);

    try {

        const formData=new FormData();
      formData.append("file",file)
      console.log(formData.get("file"));

    let res;
       
    res=  await  axios.post(`${BASE_URL}/upload`,formData);

        
     return res  


  

    
    } catch (error) {
        console.log(error);
        
    }


}





