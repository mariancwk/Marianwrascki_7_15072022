import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendPost from '../../components/SendPost/SendPost';
import SendPostModal from '../Modals/SendPostModal';
import './Header.css'

// Display the header and the sendpost modal
const Header = () => {
    let navigate = useNavigate()
    const [isPostOpen, setIsPostOpen] = useState(false)
    
    const HandleLogout = async (e) => {
        e.preventDefault()
        localStorage.removeItem('JWT')
        localStorage.removeItem('user')
        navigate('/Login')
    }

    const HandleOpenPopUpPost = () => {
        setIsPostOpen(true)
        document.body.classList.add('no-scrolling')
    }

    return (
        <div className='header-content'>
            <div className="header-logo">
                <img src="../images/logo-whiteMode.png" alt="" />
            </div>
            <div className="header-btns">
                <button onClick={HandleOpenPopUpPost} >Publier</button>
                <button onClick={ HandleLogout } >Déconnexion</button>
            </div>
            
            <SendPostModal 
            open={isPostOpen}
            onClose={() => {
                document.body.classList.remove('no-scrolling')
                setIsPostOpen(false)
            }}>
                <SendPost
                    onPostSent={() => {
                        document.body.classList.remove('no-scrolling')
                        setIsPostOpen(false)
                    }}
                />
            </SendPostModal>

        </div>
    );
};

export default Header;