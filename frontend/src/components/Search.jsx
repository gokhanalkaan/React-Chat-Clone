import React, { useState } from 'react'
import styled from "styled-components";
import { addUser, searchUser } from '../redux/apiCalls';
import {useSelector,useDispatch} from  "react-redux";
import { darkMode,lightMode } from '../utils/backgrounds';


const Container =styled.div`

display: flex;

flex-direction: column;


 
`;



const Input =styled.input`
padding: 13px;

background-color:${props =>props.bgMode ===true ? darkMode.searchInput:lightMode.searchInput};
color: white;
border: none;
outline:none;

border-bottom: 1px solid #a7bcff;       
&::placeholder {
    color: rgb(175, 175, 175);
 }



 
`;

const Divider=styled.hr`
border-color: #a7bcff;
`;

const User =styled.div`
display: flex;
margin-top: 10px;
margin-left: 2px;
align-items: center;
position: relative;

cursor: pointer;
&:hover{
    background-color:${props =>props.bgMode ===true ? darkMode.chatHover:lightMode.chatHover};


}




 
`;

const UserPhoto=styled.img`
height: 42px;
width: 42px;
border-radius: 50%;
object-fit: cover;


`;


const UserInfo =styled.div`
margin-left: 10px;


`;


const Username =styled.span`
    color: #F2F0F3;
    font-size: 20px;
    font-weight: bold;

`;



const LastMessage =styled.p`
   
    color: rgb(180, 180, 181);

`;





const Search = () => {

  const[username,setUsername]=useState("");
  const[searcheduser,setSearcheduser]=useState(null);
  const darkMode= useSelector(state => state.darkMode.darkMode);
  const dispatch=useDispatch();
  const currentUser= useSelector(state => state.auth.currentUser);
 


  const handleSearch= async(e)=>{
    if(e.code ==="Enter"){

     const res= await searchUser(username);

     if(res){
      setSearcheduser(res.data);
      setUsername("")
     
     }
     else{
      setSearcheduser(null);
     }



    }


  }

  const handleAdduser = async()=>  {
    addUser(currentUser,searcheduser,dispatch);
    setSearcheduser(null);
  


  }
  return (
    
    <Container>
        <Input  bgMode={darkMode} value={username} onKeyDown={handleSearch} onChange={e=> setUsername(e.target.value)} placeholder='find a user'/>
       {searcheduser&& <>
        <User bgMode={darkMode} onClick={handleAdduser}>
        <UserPhoto src={`${searcheduser.profilePhoto?searcheduser.profilePhoto:"https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}`}/>
        <UserInfo>
            <Username>{ searcheduser.username  }</Username>
            <LastMessage></LastMessage>
        </UserInfo>
      

     
    </User>
    <Divider/>

    </>
    
       

           
       
       } 
       
        
       
        

    </Container>
  )
}

export default Search