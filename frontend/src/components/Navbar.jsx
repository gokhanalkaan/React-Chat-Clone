import React from 'react'
import styled from "styled-components";
import {useSelector,useDispatch} from  "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from '../redux/apiCalls';
import { darkMode,lightMode } from '../utils/backgrounds';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {toggleDarkMode} from '../redux/darkModeRedux'


const Container =styled.div`
height: 80px;
display: flex;
align-items: center;

justify-content: space-between;
background-color:${props =>props.bgMode ===true ? darkMode.navbar:lightMode.navbar};





 
`;

const Logo =styled.span`
    font-weight: bold;
    font-size: 28px;
    color: white;
    font-family: Georgia, 'Times New Roman', Times, serif;
    flex: 1;
`;

const User=styled.div`
display: flex;
align-items: center;
justify-content: space-around;
flex: 2;

`;

const ProfilePhoto=styled.img`
height: 34px;
width: 34px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;

`;

const Username =styled.span`
 
    font-size: 14px;
    color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

`;

const Button =styled.button`
background-color:${props =>props.bgMode ===true ? darkMode.logOutButton:lightMode.logOutButton};
color: white;
border: none;
cursor: pointer;
font-size: 12px;
padding: 8px 5px;

 
   

`;




const Navbar = () => {

  const darkMode= useSelector(state => state.darkMode.darkMode);
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch=useDispatch();
  const socket=useSelector(state => state.socket.socket)

  const handleLogout = ()=>{

    logOut(dispatch)
    socket.current.emit("forceDisconnect")
  }



  return (
   <Container bgMode={darkMode}>
   <Logo>Chatty</Logo>
   <div onClick={()=>{dispatch(toggleDarkMode())}} style={{color:"#f9e019" ,cursor:"pointer" }  } >{

    darkMode? <DarkModeIcon/>: <LightModeIcon />
    
    }

   </div>
   <User>
    <ProfilePhoto src={`${currentUser.profilePhoto ?currentUser.profilePhoto:"https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" }`}/>
    <Username>{currentUser.username}</Username>
    <Button bgMode={darkMode} onClick={handleLogout}>Logout</Button>


    

   </User>

   </Container>
  )
}

export default Navbar