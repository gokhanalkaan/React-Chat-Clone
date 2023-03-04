import React from 'react'
import styled from "styled-components";
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

const Container=styled.div `
height: 100vh;
display: flex;



`;

const Home = () => {
 


  return (
   <div > 
     <Container>
       <Sidebar/>
       <Chat/>


     </Container>

    </div>
   
   
   
  )
}

export default Home