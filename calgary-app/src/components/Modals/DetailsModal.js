import React, { useState, useEffect } from 'react';
import './DetailsModal.css';
import BookingModal from './BookingModal.js';
import ConfirmationModal from './ConfirmationModal.js';

const DetailsModal = ({ show, onClose, image, title, openingHours, price, location, description }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(
    price ? parseFloat(price.replace(/[^0-9.]/g, '')) * 1 : 0
  );
  const [formErrors, setFormErrors] = useState({
    tickets: '',
    date: '',
    time: ''
  });

  const addToItinerary = () => {
    const itineraryItem = {
      title,
      tickets,
      date,
      time,
      totalPrice,
      location,
      imageSrc: image,
    };

    // Retrieve existing itinerary from localStorage
    const itinerary = JSON.parse(localStorage.getItem('itinerary')) || [];
    
    // Add the new item to the itinerary
    itinerary.push(itineraryItem);

    // Save the updated itinerary back to localStorage
    localStorage.setItem('itinerary', JSON.stringify(itinerary));
  };

  const openBookingModal = () => {
    let errors = {};

    if (tickets <= 0) {
      errors.tickets = 'Please select at least 1 ticket';
    }
    if (!date) {
      errors.date = 'Please select a date';
    }
    if (!time) {
      errors.time = 'Please select a time';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear any previous validation errors
    setFormErrors({});

    if (totalPrice === 0) {
      // Directly add to itinerary and show confirmation modal if price is $0
      addToItinerary();
      setIsConfirmationModalOpen(true);
    } else {
      setIsBookingModalOpen(true); // Open BookingModal otherwise
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setIsConfirmationModalOpen(false);
    setFormErrors({}); // Clear form errors on close
    onClose();
  };

  // Calculate total price whenever tickets change
  useEffect(() => {
    if (price) {
      const pricePerTicket = parseFloat(price.replace(/[^0-9.]/g, '')) || 0; // Extract numeric value or fallback to 0
      setTotalPrice(pricePerTicket * tickets);
    } else {
      setTotalPrice(0); // Default to 0 if price is undefined
    }
  }, [tickets, price]);

  if (!show) return null;

  return (
    <div className="group66-container">
      <div className="group66-group66">
        <div className="group66-group65">
          <div className="group66-rectangle20"></div>

          {/* Ticket, Date, and Time Inputs */}
          <div className="group66-frame1">
            <div className="group66-frame12">
              <label>
                No. Tickets:
                <input
                  className="group66-input12"
                  type="number"
                  min="1"
                  value={tickets}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setTickets(isNaN(value) ? 1 : value);
                    setFormErrors({ ...formErrors, tickets: '' }); // Clear error on change
                  }}
                />
              </label>
              {formErrors.tickets && <div className="error-message">{formErrors.tickets}</div>}
            </div>

            <div className="group66-frame10">
              <label>
                Date:
                <input
                  className="group66-input10"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setFormErrors({ ...formErrors, date: '' }); // Clear error on change
                  }}
                />
              </label>
              {formErrors.date && <div className="error-message">{formErrors.date}</div>}
            </div>

            <div className="group66-frame11">
              <label>
                Time:
                <input
                  className="group66-input11"
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    setFormErrors({ ...formErrors, time: '' }); // Clear error on change
                  }}
                />
              </label>
              {formErrors.time && <div className="error-message">{formErrors.time}</div>}
            </div>
          </div>

          {/* Event Image */}
          <div className="group66-content1">
            <img src={image} alt={title} className="details-image" />
          </div>

          {/* Book Button */}
          <div className="group66-frame13">
            <button
              className="group66-button"
              onClick={openBookingModal}
            >
              <div className="group66-statelayer1">
                <span className="group66-text13 M3labellarge">Book Event</span>
              </div>
            </button>
          </div>

          {/* Title and Close Button */}
          <span className="group66-text15 M3titlelarge">{title}</span>
          <div className="group66-frame8">
            <button className="group66-close" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="group66-frame9">
            <button className="group66-back" onClick={handleClose}>
              ←
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="group66-frame6">
          <span className="group66-text16">
            <span className="group66-text17">Opening Hours:</span>
            <span className="group66-text18"> {openingHours}</span>
            <br />
            <span className="group66-text21">Price per person:</span>
            <span className="group66-text22"> {price || 'Not Available'}</span>
            <br />
            <span className="group66-text25">Location:</span>
            <span className="group66-text26"> {location}</span>
          </span>
        </div>

        {/* Why Visit Section */}
        <div className="group66-frame7">
          <span className="group66-text29">
            <span className="group66-text30">Why visit?</span>
            <br />
            <span>{description}</span>
          </span>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          show={isBookingModalOpen}
          onClose={handleClose}
          tickets={tickets}
          title={title}
          date={date}
          time={time}
          totalPrice={totalPrice}
          location={location}
          imageSrc={image}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          show={isConfirmationModalOpen}
          onClose={handleClose}
          imageSrc={image}
          title={title}
        />
      )}
    </div>
  );
};

export default DetailsModal;
