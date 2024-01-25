import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Container = styled.div`
  width: 200px;
  height: 100%;
  background-color: #202020;
  color: #fff;
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: scroll;
  z-index: 1;
`;

const Wrapper = styled.div`
  padding: 10px;
  padding-left:25px;
  border-bottom:none;
  
`;
const Wrapper1 = styled.div`
  padding-left:25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  color: #fff;
  transition: background-color 0.3s;
    &:hover {
    background-color: #454545;
  }
`;


const Item2 = styled.div`
  display: flex;
  flex-direction:column;
  width:40%;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  color: #fff;
  transition: background-color 0.3s;
   &:hover {
    background-color: #454545;
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
`;

const Login = styled.div`
  color: #aaa;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
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

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { showSidebar } = useSelector((state) => state?.user);
  

  // home,Explore,sub,download,you
  return (
    <Container>
      <Wrapper>
        {showSidebar === true ? (<Wrapper1>
          <Link to="/" >
            <Item2>
              <HomeIcon />
              Home
            </Item2>
          </Link>
          <Link to="trends" >
            <Item2>
              <ExploreOutlinedIcon />
              Explore
            </Item2>
          </Link>
          <Link to="subscriptions">
            <Item2>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item2>
          </Link>
          <Item2>
            <VideoLibraryOutlinedIcon />
            Library
          </Item2>
          <Item2>
            <HistoryOutlinedIcon />
            History
          </Item2>




        </Wrapper1>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Item>
                <HomeIcon />
                Home
              </Item>

            </Link>
            <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
              <Item>
                <ExploreOutlinedIcon />
                Explore
              </Item>
            </Link>

            <Link
              to="subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SubscriptionsOutlinedIcon />
                Subscriptions
              </Item>
            </Link>
            <Hr />
            <Item>
              <VideoLibraryOutlinedIcon />
              Library
            </Item>
            <Item>
              <HistoryOutlinedIcon />
              History
            </Item>
            <Hr />
            {!currentUser &&
              <>
                <Login>
                  Sign in to like videos, comment, and subscribe.
                  <Link to="signin" style={{ textDecoration: "none" }}>
                    <Button>
                      <AccountCircleOutlinedIcon />
                      SIGN IN
                    </Button>
                  </Link>
                </Login>
                <Hr />
              </>
            }
            <Title>BEST OF NULLCLASS</Title>
            <Item>
              <LibraryMusicOutlinedIcon />
              Music
            </Item>
            <Item>
              <SportsBasketballOutlinedIcon />
              Sports
            </Item>
            <Item>
              <SportsEsportsOutlinedIcon />
              Gaming
            </Item>
            <Item>
              <MovieOutlinedIcon />
              Movies
            </Item>
            <Item>
              <ArticleOutlinedIcon />
              News
            </Item>
            <Item>
              <LiveTvOutlinedIcon />
              Live
            </Item>
            <Hr />
            <Item>
              <SettingsOutlinedIcon />
              Settings
            </Item>
            <Item>
              <FlagOutlinedIcon />
              Report
            </Item>
            <Item>
              <HelpOutlineOutlinedIcon />
              Help
            </Item>
            <Item>
              <LibraryMusicOutlinedIcon />
              Music
            </Item>
            <Item>
              <SportsBasketballOutlinedIcon />
              Sports
            </Item>
            <Item>
              <SportsEsportsOutlinedIcon />
              Gaming
            </Item>
            <Item>
              <MovieOutlinedIcon />
              Movies
            </Item>
            <Item>
              <ArticleOutlinedIcon />
              News
            </Item>
            <Item>
              <LiveTvOutlinedIcon />
              Live
            </Item>
            <Hr />
            <Item>
              <SettingsOutlinedIcon />
              Settings
            </Item>
            <Item>
              <FlagOutlinedIcon />
              Report
            </Item>
            <Item>
              <HelpOutlineOutlinedIcon />
              Help
            </Item>
            <Item >
              <SettingsBrightnessOutlinedIcon />
              Light Mode
            </Item>
          </>)}


      </Wrapper>
    </Container>
  );
};

export default Menu;