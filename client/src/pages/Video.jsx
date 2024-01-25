import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import SettingsIcon from '@mui/icons-material/Settings';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 30px;
  width: 80%;


  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex: 5;
 
`;
const VideoWrapper = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color:#fff;
 
  
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:#fff;
`;

const Info = styled.span`
  color:#fff;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #fff;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 30px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  width: 100%;
  height: auto;
  max-width: 720px;
  object-fit: cover;

  @media (min-width: 768px) {
    max-width: 720px; 
  }
`;

const CustomSettingsIcon = styled(SettingsIcon)`
  color: #fff;
  position: absolute;
  bottom: 40px; 
  right: 160px;
  cursor: pointer;
  display: ${(props) => (props.isFullScreen ? "none" : "block")};
`;


const QualityOptions = styled.div`
  position: absolute;
  bottom: 50px;
  right: 70px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const QualityButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#cc1a00" : "#ccc")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#cc1a00" : "#bbb")};
  }
`;

const RedSign = styled.span`
  color: #cc1a00;
  margin-left: 5px;
`;





const Video = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeQuality, setActiveQuality] = useState("Auto");
  const videoRef = useRef(null);


  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});



  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };


  const handleQualityChange = (newQuality) => {
    console.log("Changing quality to:", newQuality);
    setActiveQuality(newQuality);
    if (videoRef.current && videoRef.current.changeQuality) {
      console.log("Calling changeQuality method");
      videoRef.current.changeQuality(newQuality);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        await axios.put(`/videos/view/${videoRes.data._id}`);
      } catch (err) { }
    };
    fetchData();
  }, [path, dispatch]);




  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  if (!currentUser) {
    return <div style={{ color: '#fff', fontSize: "50px", }}>User not logged in!</div>;
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame ref={videoRef} src={`${currentVideo?.videoUrl}?vq=${activeQuality}`} controls={true} autoPlay />
          <CustomSettingsIcon onClick={toggleSettings} />
          <QualityOptions isOpen={isSettingsOpen}>
            <QualityButton isActive={activeQuality === "Auto"} onClick={() => handleQualityChange("Auto")}>
              Auto
            </QualityButton>
            <QualityButton isActive={activeQuality === "144"} onClick={() => handleQualityChange("144")}>
              144p
            </QualityButton>
            <QualityButton isActive={activeQuality === "320"} onClick={() => handleQualityChange("320")}>
              320p
            </QualityButton>
            <QualityButton isActive={activeQuality === "480"} onClick={() => handleQualityChange("480")}>
              480p
            </QualityButton>
            <QualityButton isActive={activeQuality === "720"} onClick={() => handleQualityChange("720")}>
              720p{activeQuality === "720" && <RedSign>HD</RedSign>}
            </QualityButton>
            <QualityButton isActive={activeQuality === "1080"} onClick={() => handleQualityChange("1080")}>
              1080p{activeQuality === "1080" && <RedSign>HD</RedSign>}
            </QualityButton>
          </QualityOptions>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}

          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;