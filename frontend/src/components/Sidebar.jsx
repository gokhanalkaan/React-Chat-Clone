import React from 'react'
import styled from "styled-components";
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import { darkMode,lightMode } from '../utils/backgrounds';
import { useSelector } from 'react-redux';
const Container =styled.div`
background-color:${props =>props.bgMode ===true ? darkMode.sidebar:lightMode.sidebar};
flex: 1;
overflow-y: scroll;

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



const Sidebar = () => {

 const darkMode= useSelector(state => state.darkMode.darkMode);
  return (
  <Container bgMode={darkMode}>
    <Navbar/>
    <Search/>
    <Chats/>


  </Container>
  )
}

export default Sidebar