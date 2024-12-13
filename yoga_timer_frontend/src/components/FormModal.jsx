import React from 'react';
import PropTypes from 'prop-types';

function FormModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-bone p-6 rounded-lg shadow-lg z-10 max-w-lg w-[80%]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-black text-gold hover:bg-gold hover:text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormModal;
