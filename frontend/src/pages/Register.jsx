import React,{ useState } from 'react'
import styled from "styled-components";
import { publicRequest } from '../requestMethods';

import { Link,   useNavigate } from "react-router-dom";
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
padding: 12px;

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
background-color: transparent;
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
background-color:#07a04e;
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









const Register = () => {
  const navigate=useNavigate();

// const history=useHistory();

  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[profilePhoto,setProfilePhoto]=useState("");
  const[error,setError]=useState(false);

  const handleRegister=async(e) =>{
    e.preventDefault();

   

    const user={
      username,
      email,
      password,
      profilePhoto,
    }

    console.log(user)

  

    try {

    

      await publicRequest.post("auth/register",user);
     // history.push("/login");
    navigate("/login");
      
    } catch (error) {
      setError(true);
      
    }
  }

  
  return (
  
    <Container>
        <Form>
            <FormHeader>Register</FormHeader>
            {error && <Error>Something went wrong.</Error>}
            <FormInputs>
                <Input  onChange={e => setUsername(e.target.value)} placeholder='Username'/>
                <Input  onChange={e => setEmail(e.target.value)} type={'email'} placeholder='Email'/>
                <Input  onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Password'/>
                <Input  onChange={e => setProfilePhoto(e.target.value)} placeholder='Profile Photo'/>
                <Button onClick={handleRegister}>Register</Button>
                <Span>Do you have an account? Go to  <Link to={`/login`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Login Page.</strong> </Link> </Span>
                
                
            </FormInputs>

        </Form>
        
    </Container>
  )
}

export default Register