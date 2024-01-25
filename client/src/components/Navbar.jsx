// Navbar.js

import React, { useState } from "react";
import "./Navbar.css";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutButton from "./LogoutButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Upload from "./Upload";
import NullClass from "../img/logo.png";
import MenuIcon from '@mui/icons-material/Menu';

import { SetSidebar } from "../redux/userSlice";

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color:#fafafa;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const CustomMenuIcon = styled(MenuIcon)`
  color:#fff;
`;



const Navbar = () => {
  const navigate = useNavigate()
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { showSidebar } = useSelector((state) => state?.user);


  const handleMenuClick = () => {
    // setShowSidebar(!showSidebar);
    dispatch(SetSidebar(!showSidebar))
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="header">
        <div className="header_left">
          <CustomMenuIcon onClick={handleMenuClick} />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img className="header_logo" src={NullClass} alt="img" />
          </Link>
        </div>

        <div className="header_input">
          <div className="header_middle">
            <input className="SearchInput" placeholder="Search..." onChange={(e) => setQ(e.target.value)} />
            <SearchOutlinedIcon className="header_searchBtn" onClick={() => navigate(`/search?q=${q}`)} />
          </div>
        </div>

        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
            <Avatar src={currentUser.img} />
            {currentUser.name[0]}
            <LogoutButton />
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
            </Button>
          </Link>
        )}
      </div>
      {/* {showSidebar && <LeftSidebar onClose={() => setShowSidebar(false)} />} */}
      {open && <Upload setOpen={setOpen} />}

    </div>


  );
};

export default Navbar;
