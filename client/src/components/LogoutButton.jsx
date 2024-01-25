import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import styled from "styled-components";
import Arrow from "../img/Arrow.png"


const Button = styled.button`
  padding: 0; 
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none; 
  color: #3ea6ff;
  border-radius: 50%;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; 
`;




const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
            <img src={Arrow} alt="img" width="20" height="auto" style={{ borderRadius: '50%' }} />
        </Button>
    );
};

export default LogoutButton;
