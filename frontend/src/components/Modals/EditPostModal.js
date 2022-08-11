import React from 'react';
import ReactDom from 'react-dom'


const EditPostModal = ({ children, open, onClose }) => {
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className="blur-layout"></div>
            <div className="editPost-popup">
                <button className='btn-ghost' onClick={onClose} >Annuler</button>
                { children }
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default EditPostModal;