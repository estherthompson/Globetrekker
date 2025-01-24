import React, { useState, useEffect } from "react";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import backIcon from "../assets/back-icon.png";
import Export from "../assets/export";
import { useNavigate } from "react-router-dom";
import DeleteBooking from "../assets/deleteBooking";
import "./Itinerary.css";

const Itinerary = () => {
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState([]);
    const [selectedDate, setSelectedDate] = useState(""); // To keep track of the active tab
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Fetch and sort itinerary data
    useEffect(() => {
        const savedItinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
        const sortedItinerary = savedItinerary.sort((a, b) => {
            if (a.date === b.date) {
                return a.time.localeCompare(b.time); // Sort by time if dates are equal
            }
            return a.date.localeCompare(b.date); // Sort by date
        });
        setItinerary(sortedItinerary);
        if (sortedItinerary.length > 0) {
            setSelectedDate(sortedItinerary[0].date); // Set the first date as default
        }
    }, []);

    const handleExport = () => {
        const doc = new jsPDF();

        // Add Itinerary Title
        doc.setFontSize(16);
        doc.text("My Itinerary", 20, 20);

        doc.setFontSize(12);
        itinerary.forEach((item, index) => {
            doc.text(
                `${item.date || "N/A"} - ${item.time || "N/A"}: ${item.title || "N/A"} (${item.tickets || 0} tickets, Total: $${item.totalPrice?.toFixed(2) || "0.00"})`,
                20,
                40 + index * 10
            );
        });

        // Open the PDF in a new tab
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item); // Set the item to delete
        setShowConfirmation(true); // Show the confirmation popup
    };

    const confirmDeletion = () => {
        if (itemToDelete) {
            const updatedItinerary = itinerary.filter((item) => item !== itemToDelete); // Remove the selected item
            setItinerary(updatedItinerary); // Update state
            localStorage.setItem("itinerary", JSON.stringify(updatedItinerary)); // Save changes to localStorage
    
            // Check if the current date still has items
            const remainingItemsForDate = updatedItinerary.filter(
                (item) => item.date === selectedDate
            );
    
            if (remainingItemsForDate.length === 0) {
                // If no items are left for the selected date, find the next available date
                const groupedByDate = updatedItinerary.reduce((acc, item) => {
                    acc[item.date] = acc[item.date] || [];
                    acc[item.date].push(item);
                    return acc;
                }, {});
    
                const nextAvailableDate = Object.keys(groupedByDate)[0]; // Get the next available date
                setSelectedDate(nextAvailableDate || ""); // Set the next available date, or blank if none
            }
        }
    
        setShowConfirmation(false); // Hide the popup
        setItemToDelete(null); // Reset the itemToDelete
    };
    

    const cancelDeletion = () => {
        setShowConfirmation(false); // Hide the popup
        setItemToDelete(null); // Reset the itemToDelete
    };

    // Group itinerary items by date
    const groupedByDate = itinerary.reduce((acc, item) => {
        acc[item.date] = acc[item.date] || [];
        acc[item.date].push(item);
        return acc;
    }, {});

    return (
        <div className="calgary-landmarks">
            <nav className="landmarksNavbar">
                {/* Back Button */}
                <img
                    src={backIcon}
                    alt="Back"
                    className="backButtonImage"
                    onClick={() => navigate(-1)}
                />

                {/* Title */}
                <h1 className="navbarTitle">Your Itinerary</h1>

                {/* Export Button */}
                <div className="export" onClick={handleExport}>
                    <Export
                        style={{ width: "30px", height: "30px", marginRight: "8px" }}
                    />
                </div>
            </nav>

            {/* Date Tabs */}
            <div className="date-tabs">
                {Object.keys(groupedByDate).map((date) => (
                    <button
                        key={date}
                        className={`date-tab ${selectedDate === date ? "active" : ""}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {/* Itinerary List */}
            <div className="itinerary-list">
                {groupedByDate[selectedDate]?.map((item, index) => (
                    <div key={index} className="itinerary-item">
                        <button
                            className="delete-booking-button"
                            onClick={() => handleDeleteClick(item)}
                        >
                            <DeleteBooking
                                style={{ width: "30px", height: "30px", marginRight: "8px" }}
                            />
                        </button>
                        <img
                            src={item.imageSrc || ""}
                            alt={item.title || "Item"}
                            className="itinerary-image"
                        />
                        <div className="itinerary-details">
                            <h3 className="itinerary-title">{item.title || "No Title"}</h3>
                            <p>
                                <strong>Time:</strong> {item.time || "N/A"}
                            </p>
                            <p>
                                <strong>Location:</strong> {item.location || "N/A"}
                            </p>
                            <p>
                                <strong>Tickets:</strong> {item.tickets || 0}
                            </p>
                            <p>
                                <strong>Total Price:</strong> $
                                {item.totalPrice?.toFixed(2) || "0.00"}
                            </p>
                            <button
                                className="view-tickets-button"
                                onClick={() => {
                                    const doc = new jsPDF();
                                    doc.text(`Ticket for ${item.title}`, 20, 20);
                                    doc.text(`Date: ${item.date}`, 20, 30);
                                    doc.text(`Time: ${item.time}`, 20, 40);
                                    doc.text(`Tickets: ${item.tickets}`, 20, 50);
                                    const pdfBlob = doc.output("blob");
                                    const pdfUrl = URL.createObjectURL(pdfBlob);
                                    window.open(pdfUrl, "_blank");
                                }}
                            >
                                View Tickets
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-popup">
                        <p>Are you sure you want to cancel this event?</p>
                        <button className="confirm-button" onClick={confirmDeletion}>
                            Yes
                        </button>
                        <button className="cancel-button" onClick={cancelDeletion}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Itinerary;
