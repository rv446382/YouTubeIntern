import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./Home";
import Video from "./Video";
import SignIn from "./SignIn";
import Search from "./Search";
import { useSelector } from 'react-redux';
import VideoNew from '../VideoNew';


const MainRoutes = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <Routes>
            
            <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
               
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="signin" element={currentUser ? <Home /> : <SignIn />} />
                <Route path="video">
                    <Route path=":id" element={<Video />} />
                </Route>
            </Route>
            <Route path="/videoNew" element={<VideoNew />}/>
        </Routes>


    )
}

export default MainRoutes
