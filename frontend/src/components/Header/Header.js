import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendPost from '../../components/SendPost/SendPost';
import Modal from '../../components/Modal';
import './Header.css'

const Header = () => {
    let navigate = useNavigate()
    const [isPostOpen, setIsPostOpen] = useState(false)
    
    const HandleLogout = async (e) => {
        e.preventDefault()
        localStorage.removeItem('JWT')
        localStorage.removeItem('userId')
        navigate('/Login')
    }

    return (
        <div className='header-content'>
            <div className="header-logo">
                <img src="../images/logo-whiteMode.png" alt="" />
            </div>
            <div className="header-btns">
                <button onClick={() => setIsPostOpen(true)} >Poster</button>
                <button onClick={ HandleLogout } >Déconnexion</button>
            </div>
            
            <Modal 
            open={isPostOpen}
            onClose={() => setIsPostOpen(false)} >
                <SendPost />
            </Modal>

        </div>
    );
};

export default Header;