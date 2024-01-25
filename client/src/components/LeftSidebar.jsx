import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import './LeftSidebar.css';

function LeftSidebar() {
    return (
        <div className='container_leftSidebar' >
            <Link to="/" className='icon_sidebar_div' >
                <HomeIcon className="icon_sidebar" />
                <div className="text_sidebar_icon">Home</div>
            </Link>
            <Link to="trends" className='icon_sidebar_div' >
                <ExploreIcon className="icon_sidebar" />
                <div className="text_sidebar_icon">Explore</div>
            </Link>
            <Link to="subscriptions" className='icon_sidebar_div' >
                <SubscriptionsIcon className="icon_sidebar" />
                <div className="text_sidebar_icon" >Subscriptions</div>
            </Link>
            <div className='icon_sidebar_div' >
                <VideoLibraryIcon className="icon_sidebar" />
                <div className="text_sidebar_icon" >Library</div>
            </div>
            <div className='icon_sidebar_div' >
                <HistoryIcon className="icon_sidebar" />
                <div className="text_sidebar_icon">History</div>
            </div>
        </div>
    )
}

export default LeftSidebar;
