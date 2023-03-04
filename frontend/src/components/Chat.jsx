import React from 'react'
import styled from "styled-components";
import ChatNavbar from './ChatNavbar';
import Input from './Input';
import Messages from './Messages';


const Container =styled.div`

flex: 3;


 
`;
const Chat = () => {
  return (
  <Container>
    <ChatNavbar/>
    <Messages/>
    

    
  </Container>
  )
}

export default Chat