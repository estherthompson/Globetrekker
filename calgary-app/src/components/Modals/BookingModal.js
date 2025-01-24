import React, { useState } from 'react';
import './BookingModal.css';
import ConfirmationModal from './ConfirmationModal.js';

const BookingModal = ({ show, onClose, tickets, date, time, location, totalPrice, imageSrc, title }) => {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [dateValue, setDateValue] = useState("");
    const [formData, setFormData] = useState({
        lastName: "",
        billingAddress: "",
        postalCode: "",
        country: "",
        cvv: "",
        email: "",
        firstName: "",
        cardNumber: "",
        stateProvince: "",
        city: "",
    });
    const [errors, setErrors] = useState({});

    // Handle user input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear the specific field's error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleDateChange = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, "");
        if (value.length >= 3) {
            value = value.slice(0, 2) + "-" + value.slice(2, 6); // Format as MM-YYYY
        }
        setDateValue(value);
    };

    

    // Validate form before allowing payment
    const validateForm = () => {
        const newErrors = {};
        
        // List of required fields
        const requiredFields = [
            'lastName', 'billingAddress', 'postalCode', 'country', 
            'cvv', 'email', 'firstName', 'cardNumber', 
            'stateProvince', 'city'
        ];

        // Check each required field
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = 'This field is required';
            }
        });

        // Validate card number (basic check for length)
        if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length < 12) {
            newErrors.cardNumber = 'Invalid card number';
        }

        // Validate CVV (should be 3-4 digits)
        if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = 'Invalid CVV';
        }

        // Validate expiration date
        const dateRegex = /^(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(dateValue)) {
            newErrors.expirationDate = 'Invalid date (MM-YYYY)';
        }

        // If any errors, set them and return false
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const addToItinerary = () => {
        const itineraryItem = {
            title,
            tickets,
            date,
            time,
            location,
            totalPrice,
            imageSrc,
        };

        // Retrieve existing itinerary from localStorage
        const itinerary = JSON.parse(localStorage.getItem('itinerary')) || [];
        
        // Add the new item to the itinerary
        itinerary.push(itineraryItem);

        // Save the updated itinerary back to localStorage
        localStorage.setItem('itinerary', JSON.stringify(itinerary));
    };

    const openConfirmationModal = () => {
        // Validate form before proceeding
        if (validateForm()) {
            addToItinerary(); // Add the item to the itinerary
            setIsConfirmationModalOpen(true);
        }
    };

    const handleClose = () => {
        setIsConfirmationModalOpen(false);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="frame67-container">
            <div className="frame67-frame67">
                <div className="frame67-group32">
                    <div className="frame67-group31">
                        <div className="frame67-group30">
                            <div className="frame67-content1">
                                <div className="frame67-content2"></div>
                            </div>
                            <button
                                className="frame67-button"
                                onClick={openConfirmationModal}
                            >
                                <div className="frame67-statelayer1">
                                    <span className="frame67-text10 M3labellarge">Pay</span>
                                </div>
                            </button>
                            <span className="frame67-text12 M3titlelarge">
                                Enter Billing Info
                            </span>
                            <div className="group66-frame9">
                                <button className="group66-back" onClick={onClose}>
                                    ←
                                </button>
                            </div>
                            <button className='frame67-close' onClick={handleClose}>X</button>
                            <div className="frame67-arrowleft"></div>
                            
                            {/* Last Name Input */}
                            <div className="frame67-inputchip1">
                                <div className="frame67-statelayer3">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="frame67-box5"
                                    />
                                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* Billing Address Input */}
                            <div className="frame67-inputchip2">
                                <div className="frame67-statelayer4">
                                    <input
                                        type="text"
                                        placeholder="Billing Address"
                                        name="billingAddress"
                                        value={formData.billingAddress}
                                        onChange={handleInputChange}
                                        className="frame67-box6"
                                    />
                                    {errors.billingAddress && <p className="error-message">{errors.billingAddress}</p>}
                                </div>
                            </div>

                            {/* Postal Code Input */}
                            <div className="frame67-inputchip3">
                                <div className="frame67-statelayer5">
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="frame67-box7"
                                    />
                                    {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                                </div>
                            </div>

                            {/* Country Input */}
                            <div className="frame67-select-field1">
                                <div className="frame67-select1">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="frame67-box8"
                                    />
                                    {errors.country && <p className="error-message">{errors.country}</p>}
                                </div>
                            </div>

                            {/* Expiration Date Input */}
                            <div className="frame67-inputchip4">
                                <div className="frame67-statelayer6">
                                    <input
                                        type="text"
                                        value={dateValue}
                                        onChange={handleDateChange}
                                        placeholder="MM-YYYY"
                                        className="frame67-box9"
                                    />
                                    {errors.expirationDate && <p className="error-message">{errors.expirationDate}</p>}
                                </div>
                            </div>

                            {/* CVV Input */}
                            <div className="frame67-inputchip5">
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className="frame67-box10"
                                />
                                {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                                <div className="frame67-statelayer7"></div>
                            </div>

                            {/* Image and Event Details */}
                            <div className='frame67-content1'>
                                <img src={imageSrc} alt={title} className="booking-image" />
                            </div>
                            <span className="frame67-text19">
                                <strong>Title:</strong> {title}
                                <br />
                                <strong>Tickets:</strong> {tickets}
                                <br />
                                <strong>Date:</strong> {date}
                                <br />
                                <strong>Time:</strong> {time}
                                <br />
                                <strong>Location:</strong> {location}
                                <br />
                                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                            </span>

                            {/* Email Input */}
                            <div className="frame67-input-field1">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="frame67-box1"
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>

                            {/* First Name Input */}
                            <div className="frame67-inputchip6">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="frame67-box2"
                                />
                                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                            </div>

                            {/* Card Number Input */}
                            <div className="frame67-input-field2">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className="frame67-box3"
                                />
                                {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                            </div>

                            {/* State/Province and City Inputs */}
                            <div className="frame67-select-field2">
                                <div className="frame67-select2">
                                    <input
                                        type="text"
                                        placeholder="State/Province"
                                        name="stateProvince"
                                        value={formData.stateProvince}
                                        onChange={handleInputChange}
                                        className="frame67-box4"
                                    />
                                    {errors.stateProvince && <p className="error-message">{errors.stateProvince}</p>}
                                </div>
                                <div className="frame67-select3">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="frame67-box4"
                                    />
                                    {errors.city && <p className="error-message">{errors.city}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                show={isConfirmationModalOpen}
                onClose={handleClose}
                imageSrc={imageSrc}
                title={title}
            />
        </div>
    );
};

export default BookingModal;