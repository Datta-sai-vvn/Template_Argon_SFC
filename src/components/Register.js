import React, { useState } from 'react';
import styled from 'styled-components';
import { signUpUser } from '../firebase/Auth'; 
import { useNavigate,Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import BackgroundImage from '../assets/Background.jpg';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start; 
  min-height: 100vh;
  padding: 40px;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1rem;
`;

const Button = styled.button`
  background-color: #936eb4;
  color: #fff;
  padding: 14px;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7c5c95;
  }
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #333;
  border: 2px solid #936eb4;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #936eb4;
    color: #fff;
  }
`;

const LinkButton = styled.a`
  color: #936eb4;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #7c5c95;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSignUp = async () => {
    try {
      await signUpUser(email, password);
      console.log("User signed up successfully");
      navigate('/profile'); 
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <SignUpContainer>
      <FormContainer>
        <Title>Sign up</Title>
        <p>Sign up to find companions</p>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign up</Button>
        <GoogleButton>
          <FcGoogle size={24} style={{ marginRight: '8px' }} />
          Continue with Google
        </GoogleButton>
        <p>
          Already have an account?{' '}
          <LinkButton href="/login">Sign in</LinkButton>
        </p>
      </FormContainer>
    </SignUpContainer>
  );
};

export default Register;
