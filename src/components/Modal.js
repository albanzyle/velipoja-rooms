// Modal.js
import React from 'react';
import styles from '../styles/Modal.module.css'; // Assuming your modal CSS is already set up

const Modal = ({ isVisible, content, onClose, position }) => {
  if (!isVisible) return null;

  const modalStyle = {
    position: 'absolute',
    top: `${position.top - 50}px`,  // Adjust this value to position the modal above the bar
    left: `${position.left}px`,
    transform: 'translateX(-50%)', // Centers the modal relative to the bar's width
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} style={modalStyle} onClick={e => e.stopPropagation()}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;
