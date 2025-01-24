import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import CardContainer from './components/CardContainer';
import CalgaryLandmarks from './components/Pages/CalgaryLandmarks';
import Itinerary from './components/Itinerary';
import CalgaryGames from './components/Pages/CalgaryGames';
import ArtMuseum from './components/Pages/ArtMuseum';
import GroupActivites from './components/Pages/GroupActivites';
import CalgaryFestivals from './components/Pages/CalgaryFestivals';
import Celebrations from './components/Pages/Celebrations';
import ConcertsTheatre from './components/Pages/ConcertsTheatre';
import FallCalgary from './components/Pages/FallCalgary';
import FamilyActivites from './components/Pages/FamilyActivites';
import NewCalgary from './components/Pages/NewCalgary';
import OutdoorActivites from './components/Pages/OutdoorActivites';
import Restaurants from './components/Pages/Restaurants';
import calgarymap from './images/calgarymap.png';
import logo from './images/GlobeTrekker.png';
import './App.css';

function App() {
    const location = useLocation();
    const navigate = useNavigate(); // Ensure `useNavigate` is called at the top level
    const [popupType, setPopupType] = useState(null);
    const [authPopupType, setAuthPopupType] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = () => {
        if (signupData.password !== signupData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({
            username: signupData.username,
            email: signupData.email,
            password: signupData.password
        });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully! Redirecting to login.');
        setAuthPopupType('login');
    };

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            (u) => u.email === loginData.email && u.password === loginData.password
        );

        if (user) {
            setIsAuthenticated(true);
            setAuthPopupType(null);
            navigate('/'); // Redirect to the main page upon successful login
        } else {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="App">
            <Navbar openPopup={setPopupType} />

            {location.pathname === '/' && <Banner />}
            {location.pathname === '/' && (
                <p className='calgary-description'>
                    <span className="highlight">Calgary</span> is a dynamic city in Alberta, where modern skyscrapers meet a rich 
                    <span className="highlight"> western heritage</span>. Known as the heart of Canada's oil industry, 
                    Calgary combines innovation with tradition. The <span className="highlight">Calgary Stampede</span>, 
                    a legendary rodeo and festival, celebrates the city's agricultural roots and its enduring <span className="highlight">cowboy spirit</span>.
                </p>
            
            )}

            <Routes>
                <Route path="/" element={<CardContainer />} />
                <Route path="/itinerary" element={<Itinerary />} />
                <Route path="/landmarks" element={<CalgaryLandmarks />} />
                <Route path="/games" element={<CalgaryGames />} />
                <Route path="/artMuseum" element={<ArtMuseum />} />
                <Route path="/groupActivites" element={<GroupActivites />} />
                <Route path="/festivals" element={<CalgaryFestivals />} />
                <Route path="/celebrations" element={<Celebrations />} />
                <Route path="/concertsTheatre" element={<ConcertsTheatre />} />
                <Route path="/fallInCalgary" element={<FallCalgary />} />
                <Route path="/familyActivites" element={<FamilyActivites />} />
                <Route path="/newInCalgary" element={<NewCalgary />} />
                <Route path="/outdoorActivites" element={<OutdoorActivites />} />
                <Route path="/restaurants" element={<Restaurants />} />
            </Routes>

            {popupType && (
                <div className="popup-overlay" onClick={() => setPopupType(null)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setPopupType(null)}>X</button>
                        <h2>{popupType}</h2>

                        {popupType === 'Calgary Map' && (
                            <div className="map-container">
                                <p>Use your mouse wheel or touch gestures to zoom and pan.</p>
                                <TransformWrapper
                                    initialScale={1.5}
                                    initialPositionX={-250}
                                    initialPositionY={-500}
                                    minScale={1}
                                    maxScale={5}
                                    wheel={{ step: 0.2 }}
                                >
                                    <TransformComponent>
                                        <img
                                            src={calgarymap}
                                            alt="Calgary Map"
                                            className="map-image"
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                        )}

                        {popupType === 'Emergency Resources' && (
                            <div className="emergency-container">
                                <ul>
                                    <li><strong>Police:</strong> 911</li>
                                    <li><strong>Fire Department:</strong> 911</li>
                                    <li><strong>Medical Emergency:</strong> 911</li>
                                    <li><strong>Non-Emergency Police:</strong> +1-403-266-1234</li>
                                    <li><strong>Poison Control:</strong> +1-800-332-1414</li>
                                </ul>
                            </div>
                        )}

                        {popupType === 'Current Weather' && (
                            <div className="weather-container">
                                <p>Partly cloudy with a high of 15°C and a low of 8°C.</p>
                                <p>Wind: 15 km/h NW</p>
                                <p>Humidity: 60%</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!isAuthenticated && (
                <div className="popup-overlay">
                    <div className="popup-content signup-popup">
                        <img src={logo} alt="Globe Trekker Logo" className="signup-logo" />
                        {authPopupType === 'login' ? (
                            <>
                                <h2>Login</h2>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, email: e.target.value })
                                    }
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, password: e.target.value })
                                    }
                                />
                                <button onClick={handleLogin}>Login</button>
                                <p>
                                    Don't have an account?{' '}
                                    <span
                                        className="link"
                                        onClick={() => setAuthPopupType('signup')}
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <h2>Sign Up</h2>
                                <p className="signup-subtext">
                                    Sign Up to book events and build itinerary!
                                </p>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={signupData.username}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, username: e.target.value })
                                    }
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={signupData.email}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, email: e.target.value })
                                    }
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={signupData.password}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={signupData.confirmPassword}
                                    onChange={(e) =>
                                        setSignupData({
                                            ...signupData,
                                            confirmPassword: e.target.value
                                        })
                                    }
                                />
                                <button onClick={handleSignup}>Sign Up</button>
                                <p className="signup-disclaimer">
                                    By signing up, you agree to our{' '}
                                    <a href="/terms" target="_blank">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" target="_blank">
                                        Privacy Policy
                                    </a>.
                                </p>
                                <p>
                                    Already have an account?{' '}
                                    <span
                                        className="link"
                                        onClick={() => setAuthPopupType('login')}
                                    >
                                        Login
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
