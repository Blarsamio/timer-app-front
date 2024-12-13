import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed p-6 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg border border-gold">
        {children}
        <button onClick={onClose} className="mt-4 bg-gold px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
