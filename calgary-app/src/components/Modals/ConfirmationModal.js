import React from 'react'
import { useNavigate } from 'react-router-dom';

import './ConfirmationModal.css'

const ConfirmationModal = ({show, onClose, imageSrc, title}) => {

    const navigate = useNavigate();
    if (!show) return null;
    
  return (
    <div className="frame68-container">
      <div className="frame68-frame68">
        <div className="frame68-group35">
            <button className='frame68-closebutton' onClick={onClose}>X</button>
          <span className="frame68-text2">
            <span>
              Order Confirmed! See you there!
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
          </span>
          <span className="frame68-text6">
            Your tickets have been sent to your email.
          </span>
          <span className="frame68-text7">You can also view them here:</span>
          <button className="frame68-button" onClick={() => navigate('/itinerary')}>
            <div className="frame68-statelayer2">
              <span className="frame68-text8">View Itinerary</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
