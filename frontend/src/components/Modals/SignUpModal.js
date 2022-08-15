import React from 'react';

// Allows to open the SignUp component
const SignUpModal = ({ children, open, onClose }) => {
    if (!open) return null

    return (
        <>
            <div className="blur-layout"></div>
            <div className="signUp-popup">
                <button className='btn-ghost' onClick={onClose} >X</button>
                { children }
            </div>
        </>
    );
};

export default SignUpModal;