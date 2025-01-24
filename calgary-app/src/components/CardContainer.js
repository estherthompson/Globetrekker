import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardContainer.css';
import calgaryLandmarksImg from '../images/calgary-landmarks.png';
import fallCalgaryImg from '../images/fall-in-calgary.png';
import artMuseumsImg from '../images/art-museums.png';
import newCalgaryImg from '../images/new-in-calgary.jpg';
import outdoorActivites from '../images/outdoor-activites.png';
import calgaryGamesImg from '../images/calgary-games.jpg';
import festivalsImg from '../images/glow-festival.jpg';
import resturantImg from '../images/resturant.jpg'
import celebrationsImg from '../images/canada-day.jpg';
import familyActivitesImg from '../images/family-activities.png';
import concertImg from '../images/concerts.jpg';
import groupActivitesImg from "../images/group-activites.jpg";



const cards = [
    { id: 1, title: 'Calgary Landmarks', img: calgaryLandmarksImg, path: '/landmarks' },
    { id: 2, title: 'Fall in Calgary', img: fallCalgaryImg, path: '/fallInCalgary' },
    { id: 3, title: 'New in Calgary', img: newCalgaryImg, path: '/newInCalgary' },
    { id: 4, title: 'Art and Museums', img: artMuseumsImg, path: '/artMuseum'},
    { id: 5, title: 'Outdoor Activities', img: outdoorActivites, path: '/outdoorActivites' },
    { id: 6, title: 'Calgary Games', img: calgaryGamesImg, path: "/games" },
    { id: 7, title: 'Calgary Festivals', img: festivalsImg, path: "/festivals" },
    { id: 8, title: 'Resturants', img: resturantImg, path: '/restaurants' },
    { id: 9, title: 'Celebrations', img: celebrationsImg, path: '/celebrations' },
    { id: 10, title: 'Family Activities', img: familyActivitesImg, path: '/familyActivites' },
    { id: 11, title: 'Group Activities', img: groupActivitesImg, path: '/groupActivites' },
    { id: 12, title: 'Concerts and Theatre', img: concertImg, path: '/concertsTheatre' }
];

const CardContainer = () => {
    
    const navigate = useNavigate();
    
    const handleCardClick = (path) => {
        if (path){
            navigate(path); 
        } else {
            alert('This card does not have a linked page yet.')
        }
    };
    
    return (
        <div className="card-container">
            {cards.map(card => (
                <div 
                    className="card" 
                    key={card.id} 
                    onClick={() => handleCardClick(card.path)}>
                    <img src={card.img} alt={card.title} />
                    <div className="card-title">{card.title}</div>
                </div>
            ))}
        </div>
    );
};

export default CardContainer;
