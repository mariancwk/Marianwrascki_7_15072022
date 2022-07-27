import React from 'react';
import './Logo.css'
import LogoWhiteMode from '../../svg/LogoWhiteMode';

const Logo = () => {
    return (
        <div className="logo">
            <LogoWhiteMode />
            <h2>Avec Groupomania, partagez et restez en contact avec vos collègues</h2>
        </div>
    );
};

export default Logo;