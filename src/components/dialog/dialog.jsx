import { useEffect } from "react";
import { createPortal } from "react-dom";
import './dialog.css';

const Dialog = ({ title, children, onClose }) => {
  useEffect(() => {
    document.body.classList.add('body-scroll-lock');
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('body-scroll-lock');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div 
      className="dialog-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="dialog-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-header">
          <div id="dialog-title" className="dialog-title">{title}</div>
          <button 
            className="dialog-close-button" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;