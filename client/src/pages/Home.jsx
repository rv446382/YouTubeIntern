import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { SetLocation } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

const Container = styled.div`
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 height:100vh;
//  margin-left:20px auto;
 margin:60px;
 width:100%;
 
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [location, setlocation] = useState('')
  const dispatch = useDispatch();

  const fetchIPInfo = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = ` https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.table(data.address);
          dispatch(SetLocation(`${data.address.city}, ${data.address.state}`))
        })
        .catch(() => {
          console.log("Error while fetching data")
        });
    });
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/videos/random`);
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch videos");
        setIsLoading(false);
      }
    };
    fetchVideos();
    fetchIPInfo();
  }, []);

  if (isLoading) {
    return <div style={{ padding: "40px", color: "#fafafa" }}><Loader /></div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container >
  );
};

export default Home;
