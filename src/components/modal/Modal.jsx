import React from 'react';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-4xl max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Instructions</h2>
                <div className="mb-6 text-sm text-gray-700">
                    {message} 
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
