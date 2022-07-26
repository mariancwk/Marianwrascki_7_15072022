import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate()
    
    const HandleLogout = async (e) => {
        e.preventDefault()
        localStorage.removeItem('JWT')
        navigate('/Login')
    }

    return (
        <div>
            <button onClick={ HandleLogout } >Déconnexion</button>
        </div>
    );
};

export default Header;