import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess, signupFailure, signupStart, signupSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #202020;
  border: 1px solid #454545;
  padding: 20px;
  gap: 10px;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    /* Styles for laptops or larger screens */
    max-width: 600px; /* Adjust the max-width for larger screens */
  }
`;


const Title = styled.h1`
  font-size: 24px;
 
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
 
`;

const Input = styled.input`
  border: 1px solid #454545;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: #fff;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  
  
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: #fff;
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;


const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      dispatch(loginFailure())
    }
  };

  //sign up
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signupStart());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(signupSuccess(res.data));
      navigate("/signIn");
    } catch (error) {
      dispatch(signupFailure());
    }
  };



  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));

          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };




  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>Sign in with NullClass</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign up</Button>


      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;