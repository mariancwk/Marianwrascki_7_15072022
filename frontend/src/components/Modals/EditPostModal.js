import React from 'react';

const EditPostModal = ({ children, open, onClose }) => {
    if (!open) return null

    return (
        <>
            <div className="editPost-popup">
                { children }
                <button className='btn-ghost' onClick={onClose} >Annuler</button>
            </div>
        </>
    );
};

export default EditPostModal;