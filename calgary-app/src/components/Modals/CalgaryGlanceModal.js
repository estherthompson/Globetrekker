import React, { useState} from "react";
import "./CalgaryGlanceModal.css";  

const CalgaryGlanceModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
            
        </div>
    );
};

export default CalgaryGlanceModal;