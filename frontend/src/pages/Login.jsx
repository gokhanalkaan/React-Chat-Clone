import React, { useState } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { login } from '../redux/apiCalls';

const Container=styled.div `
height: 100vh;
display: flex;
background-color: #069448;
align-items: center;
justify-content: center;



`;

const Form=styled.div `


height: 50%;
width: 50%;
background-color: #fbfcfd;

display: flex;
flex-direction: column;
align-items: center;




`;

const FormHeader=styled.h1 `
font-weight: 500;
margin-bottom: 5px;

`;

const FormInputs=styled.div `
display: flex;
flex-direction: column;
align-items: center;
width: 100%;



`;
const Input=styled.input`
padding: 8px;
width: 50%;
margin: 10px auto;
border: none;
border-bottom: 2px solid #069448;
outline: none;


&::focus{
    border: 4px solid #069448;
}


`;

const Button=styled.button`
width: 50%;
padding: 8px;
background-color:#07a551;
color:white;
border:none;
cursor: pointer;




`;

const Error=styled.p`

color: red;
margin-bottom: 3px;

`;

const Span=styled.span`
font-size: smaller;
margin-top: 3px;



`;



const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const dispatch=useDispatch();
  

    const handleLogin=(e)=>{
        e.preventDefault();
        login(dispatch,{username,password});
      


    }

  return (
    <Container>
        <Form>
            <FormHeader>Login</FormHeader>
           
            <FormInputs>
                <Input  onChange={e => setUsername(e.target.value)} placeholder='Username'/>
              
                <Input onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Password'/>
                
                <Button onClick={handleLogin}>Login</Button>

                <Span>Don't you have an account? Go to  <Link to={`/register`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Register Page.</strong> </Link> </Span>
                
            </FormInputs>

        </Form>
        
    </Container>
  )
}

export default Login