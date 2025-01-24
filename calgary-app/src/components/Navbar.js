import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import HomeIcon from '../assets/home'; // Import as a React component
import Itinerary from '../assets/itinerary';
import Map from '../assets/map';
import Emergency from '../assets/emergency';
import Weather from '../assets/weather';

const Navbar = ({ openPopup }) => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            {/* Left section with Home icon and buttons */}
            <div className="navbar-left">
                <HomeIcon 
                    className="icon" 
                    onClick={() => navigate('/')} // Navigate to the main page
                    alt="Home"
                />
                <div className="buttons">
                    <button className="button" onClick={() => openPopup('Calgary Map')}>
                        <Map style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Calgary Map
                    </button>
                    <button className="button" onClick={() => openPopup('Emergency Resources')}>
                        <Emergency style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Emergency Resources
                    </button>
                    <button className="button" onClick={() => openPopup('Current Weather')}>
                        <Weather style={{ width: '35px', height: '35px', marginRight: '8px'}} />
                        Current Weather
                    </button>
                </div>
            </div>

            {/* Right section with Booking icon */}
            <div className="navbar-right">
                <Itinerary 
                    className="icon" 
                    onClick={() => navigate('/itinerary')} // Navigate to the itinerary page
                    alt="Booking"
                />
            </div>
        </div>
    );
};

export default Navbar;
