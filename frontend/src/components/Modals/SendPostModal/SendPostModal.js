import React from 'react';
import '../../SendPost/SendPost.css'

const SendPostModal = ({ children, open, onClose }) => {
    if (!open) return null

    return (
        <>
            <div className="blur-layout"></div>
            <div className="sendPost-popup">
                <button className='btn-ghost' onClick={onClose} >X</button>
                { children }
            </div>
        </>
    );
};

export default SendPostModal;