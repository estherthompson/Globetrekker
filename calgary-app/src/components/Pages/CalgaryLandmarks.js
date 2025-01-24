import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import backIcon from "../../assets/back-icon.png";
import filterIcon from "../../assets/filter-icon.png";
import calgaryTower from "../../images/calgary-landmarks.png";
import culturalCentre from "../../images/FamousLandmarks/chinese-cultural-center.png";
import kensingtonCalgary from "../../images/FamousLandmarks/Kensington.jpg";
import peaceBridge from "../../images/FamousLandmarks/peace-bridge.jpg";
import peiPark from "../../images/FamousLandmarks/pei-park.jpg";
import wonderlandCalgary from "../../images/FamousLandmarks/wonderland.jpg";
import saddledomeCalgary from "../../images/FamousLandmarks/saddledome.jpg";
import stephenAvenue from "../../images/FamousLandmarks/stephen-avenue.png";
import blueRing from "../../images/FamousLandmarks/blue-ring.png";
import telusSpark from "../../images/FamousLandmarks/telus-spark.png";
import plazaTheatre from "../../images/FamousLandmarks/plaza-theatre.jpg";
import centralLibrary from "../../images/FamousLandmarks/central-library.png";
import famousFive from "../../images/FamousLandmarks/famous-five.jpg";
import calgaryStampede from "../../images/FamousLandmarks/calgary-stampede.jpg";

import DetailsModal from "../Modals/DetailsModal";

const generalInformation = [
  { name: "Calgary Tower", 
    image: calgaryTower, 
    openingHours: "10:00 AM - 9:00 PM", 
    price: "$22",
    location: "101 9 Ave SW, Calgary, AB T2P 1J9", 
    description: "Discover Calgary from new heights at the iconic Calgary Tower. Soaring 191 metres above the city, the Observation Deck offers jaw-dropping 360° views of the bustling downtown, majestic Rocky Mountains, and sweeping prairies.  Dare to step onto the thrilling glass floor, indulge in a revolving dining experience at Sky 360, or catch one of the Tower’s dazzling light shows. Whether you're seeking unforgettable sights, unique dining, or a perfect photo op, the Calgary Tower promises an experience as vibrant as the city itself.",
    tags: ["Accessible", "Family Friendly"]},
  { name: "Stephen Avenue Walk", 
    image: stephenAvenue, 
    openingHours: "Open 24 Hours", 
    price: "$0",
    location: "8 Ave SW, Calgary",
    description:"As a flagship project for Calgary's Downtown Strategy, the City is investing in the future by transforming and modernizing Stephen Avenue. This iconic and historic street, situated in the heart of our City, serves as a cultural hub, a tourist attraction, a business district, and a vibrant place for everyday life.",
    tags: ["Group Activities"] },
  { name: "Peace Bridge", 
    image: peaceBridge, 
    openingHours: "Open 24 Hours", 
    price: "$0", 
    location: "Peace Bridge Calgary, Alberta, Canada",
    description: "Spanning the Bow River in downtown Calgary, the Peace Bridge is an architectural marvel and a symbol of connection. Designed by renowned architect Santiago Calatrava, this striking red and white pedestrian bridge features a sleek helical structure and accommodates both foot and bike traffic. Whether you're enjoying a scenic walk, snapping photos of its iconic design, or simply soaking in the surrounding river views, the Peace Bridge offers a serene yet vibrant experience. It has become one of Calgary's most photographed landmarks and a testament to the city's blend of modern design and natural beauty.",
    tags: ["Accessible", "Family Friendly"] },
  { name: "Chinese Cultural Center", 
    image: culturalCentre, 
    openingHours: "10:00 AM - 6:00 PM", 
    price: "$5",
    location: "197 1 St SW, Calgary, AB T2P 4M4",
    description:"The Calgary Chinese Cultural Centre is a vibrant hub of culture and heritage in the heart of Calgary. Inspired by Beijing's iconic Temple of Heaven, its stunning design features intricate carvings, ornate decorations, and a magnificent domed ceiling adorned with 561 hand-painted dragons. The centre hosts a variety of events, exhibitions, and workshops that celebrate Chinese art, history, and traditions. Visitors can explore its museum, enjoy authentic Chinese cuisine nearby, or participate in cultural festivals throughout the year. A cornerstone of Calgary's diverse community, the Chinese Cultural Centre is a must-see destination for culture enthusiasts and curious explorers alike.",
    tags: ["Family Friendly"] },
  { name: "Wonderland", 
    image: wonderlandCalgary, 
    openingHours: "Open 24 Hours", 
    price:"$0",
    location:"110 6 Ave SE, Calgary, AB T2G 0G2",
    description: "Standing 12 meters tall in front of Calgary’s iconic Bow Tower, the Wonderland Sculpture is a mesmerizing work of art by internationally acclaimed artist Jaume Plensa. This wire-frame depiction of a young girl’s head invites visitors to step inside its intricate design for a unique perspective of the city skyline. By day, the sculpture dazzles with its geometric beauty, and by night, it glows under the city lights. A symbol of imagination and creativity, Wonderland has become one of Calgary’s most beloved landmarks, perfect for photography, reflection, and artistic inspiration.",
    tags: ["Family Friendly"] },
  { name: "Kensington", 
    image: kensingtonCalgary, 
    openingHours: "Open 24 Hours", 
    price: "$0",
    location: "Kensington Rd NWCalgary, AB",
    description: "Nestled just steps from downtown Calgary, Kensington is a vibrant and trendy neighborhood known for its eclectic charm, boutique shopping, and diverse dining options. This bustling area features cozy cafes, unique local shops, and a mix of upscale and casual eateries, making it a favorite spot for both locals and visitors. With its tree-lined streets, cultural events, and lively atmosphere, Kensington offers the perfect blend of community, style, and convenience. Whether you're exploring art galleries, enjoying brunch, or browsing independent shops, Kensington provides an unforgettable Calgary experience.",
    tags: ["Group Activities", "Accessible"] },
  { name: "Saddledome", 
    image: saddledomeCalgary,
    openingHours: "8:00 AM - 5:00 PM", 
    price:"$0",
    location:"555 Saddledome Rise SE, Calgary, AB T2G 2W1",
    description: "The Scotiabank Saddledome is one of Calgary’s most iconic landmarks and a hub for sports and entertainment. Home to the NHL’s Calgary Flames and a venue for major concerts, shows, and events, this unique arena features its distinctive saddle-shaped roof, making it instantly recognizable. With a seating capacity of over 19,000, the Saddledome offers an electric atmosphere for hockey games, live performances, and community events throughout the year. Whether you're cheering on the Flames or attending a world-class concert, the Saddledome delivers unforgettable moments and legendary experiences.", 
    tags: ["Family Friendly", "Group Activities"] },
  { name: "Prince's Island Park", 
    image: peiPark, 
    openingHours: "Open 24 Hours", 
    price:"$0",
    location:"698 Eau Claire Ave SW, Calgary, AB T2P 5N4",
    description:"Situated on the banks of the Bow River in the heart of downtown Calgary, Prince's Island Park is a serene urban oasis offering natural beauty and recreation for all seasons. This 50-hectare park features picturesque walking and biking paths, lush green spaces, and stunning views of the city skyline. Visitors can enjoy leisurely strolls, picnics, or paddleboarding on the river while taking in the surrounding landscape. Prince's Island Park also hosts festivals, outdoor events, and cultural activities throughout the year, making it a perfect destination for relaxation, exploration, and community gatherings.",
    tags: ["Accessible", "Family Friendly", "Group Activities"] },
  { name: "Travelling Light", 
    image: blueRing, 
    openingHours: "Open 24 Hours", 
    price: "$0",
    location:"96 Avenue NE (Near Airport Tr. and Deerfoot Tr. interchange)",
    description:"Travelling Light is a striking 17-metre public art installation at the 96th Avenue NE interchange in Calgary, designed by the artistic collective inges idee. Symbolizing movement and connection, the vibrant red and white sculptural ring evokes the wheel, flight, and exploration. Integrated into the row of street lamps, it offers unique views of the surrounding landscape and cityscape while providing a bold visual identity to the interchange. An engineering marvel, Travelling Light is entirely free-standing and was fabricated by local companies.",
    tags: ["Accessible"] },
  { name: "Telus Spark", 
    image: telusSpark, 
    openingHours: "9:00 AM - 4:00 PM", 
    price:"$33",
    location: "220 Saint George's Drive Northeast, Calgary, AB T2E 5T2",
    description:"TELUS Spark Science Centre is Calgary’s premier destination for interactive science, innovation, and discovery. Designed for visitors of all ages, the centre features hands-on exhibits, planetarium shows, and interactive labs focused on science, technology, engineering, and math (STEM). Explore fascinating galleries, experiment with cutting-edge tech, and enjoy live science demonstrations in a fun and engaging environment. With its modern design and diverse programming, TELUS Spark offers an immersive and educational experience that inspires curiosity and creativity for the whole family.",
    tags: ["Family Friendly", "Accessible"] },
  { name: "Plaza Theatre", 
    image: plazaTheatre, 
    openingHours: "10:00 AM - 12:00 AM", 
    price: "$10",
    location: "1133 Kensington Rd NW, Calgary, AB T2N 3P4",
    description: "The Plaza Theatre in the heart of Calgary's vibrant Kensington neighborhood is a historic gem that offers a unique movie-going experience. Established in 1935, this charming, art-deco style cinema combines classic architecture with a cozy, intimate atmosphere. Known for showcasing independent films, classics, and special screenings, the Plaza Theatre is a beloved community hub that celebrates film and culture. Whether you're catching a classic re-release, an indie favorite, or a special event, the Plaza Theatre provides a nostalgic and memorable experience for all visitors.",
    tags: ["Family Friendly"] },
  { name: "Central Library", 
    image: centralLibrary, 
    openingHours: "Open 24 Hours", 
    price: "$0",
    location: "800 3 St SE, Calgary, AB T2G 2E7",
    description: "The Central Branch of the Calgary Public Library is a modern architectural landmark located in the heart of downtown Calgary. Known for its stunning design by Snøhetta, this iconic library combines contemporary architecture with functionality, offering a bright, open, and inviting space for learning, collaboration, and community engagement. With state-of-the-art technology, extensive book collections, study spaces, and event programming, the Central Library is more than just a reading space—it's a dynamic community hub. Whether you’re exploring new books, attending workshops, or enjoying innovative digital resources, the Central Library provides a welcoming environment for all.",
    tags: ["Accessible", "Family Friendly"] },
  { name: "Famous Five", 
    image: famousFive, 
    openingHours: "Open 24 Hours",
    price: "$0",
    location: "228 8 Ave SE, Calgary, AB T2P 2M5",
    description: "The Famous Five statue, located at Calgary's Olympic Plaza, honors the contributions of five trailblazing Canadian women—Nellie McClung, Emily Murphy, Irene Parlby, Louise McKinney, and Henrietta Muir Edwards—who fought for women's right to vote and equality in Canada. This iconic sculpture celebrates their achievements and commitment to social progress. Situated in the heart of downtown at Olympic Plaza, the monument is a symbol of equality, leadership, and empowerment. With its striking design, the statue stands as a reminder of the strength of collective action while serving as an inspiring focal point for visitors and community events.", 
    tags: ["Accessible"] },
  { name: "Calgary Stampede Park", 
    image: calgaryStampede,
    openingHours: "11:00 AM - 12:00 AM",
    price: "$25.00",
    location:"1410 Stampede Trl SE, Calgary, AB T2G 2W1",
    description: "Home to the Greatest Outdoor Show on Earth, Calgary Stampede Park hosts the iconic Calgary Stampede every July—a week-long celebration of rodeo, live music, carnival rides, and western culture. Beyond the annual event, the park offers year-round attractions, event spaces, and exhibits celebrating Alberta's cowboy heritage.",
    tags: ["Family Friendly", "Group Activities"] },
];
const CalgaryLandmarks = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle selected filters
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Function to open the details modal with the selected landmark
  const openDetailsModal = (landmark) => {
    setSelectedLandmark(landmark);
    setIsDetailsModalOpen(true);
  };

  // Filter landmarks based on selected filters
  const filteredLandmarks = selectedFilters.length
    ? generalInformation.filter((landmark) =>
        selectedFilters.every((filter) => landmark.tags.includes(filter))
      )
    : generalInformation;

  return (
    <div className="calgary-landmarks">
      <nav className="landmarksNavbar">
        <img
          src={backIcon}
          alt="Back"
          className="backButtonImage"
          onClick={() => navigate(-1)}
        />
        <h1 className="navbarTitle">Famous Landmarks</h1>

        {/* Filter Box */}
        <div className="filter-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={filterIcon} alt="Filter Icon" className="filterIconImg" height={40} />
          <span>{selectedFilters.length ? selectedFilters.join(", ") : "Filters"}</span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {["Family Friendly", "Accessible", "Group Activities"].map((filter) => (
                <div
                  key={filter}
                  className={`dropdown-item ${selectedFilters.includes(filter) ? "selected" : ""}`}
                  onClick={() => toggleFilter(filter)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  <span>{filter}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Landmarks Grid */}
      <div className="landmark-grid">
        {filteredLandmarks.map((landmark, index) => (
          <div className="landmark-card" key={index}>
            <img src={landmark.image} alt={landmark.name} className="landmark-image" />
            <div className="landmark-info">
              <h2>{landmark.name}</h2>
              <p>Opening Hours: {landmark.openingHours}</p>
              <button
                className="view-details-btn"
                onClick={() => openDetailsModal(landmark)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <DetailsModal
        show={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        image={selectedLandmark?.image}
        title={selectedLandmark?.name}
        openingHours={selectedLandmark?.openingHours}
        price={selectedLandmark?.price}
        location={selectedLandmark?.location}
        description={selectedLandmark?.description}
      />
    </div>
  );
};

export default CalgaryLandmarks;