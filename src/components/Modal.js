// Modal.js
import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ isVisible, content, onClose, position }) => {
  if (!isVisible) return null;

  const modalStyle = {
    position: 'absolute',
    top: `${position.top - 50}px`,
    left: `${position.left}px`,
    transform: 'translateX(-50%)',
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
