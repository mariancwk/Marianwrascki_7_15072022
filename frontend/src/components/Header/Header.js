import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SendPost from '../../components/SendPost/SendPost';
import { SHOW_SEND_POST_MODAL } from '../../redux/reducers/modals';
import SendPostModal from '../Modals/SendPostModal';
import './Header.css'

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
            }} >
                <SendPost />
            </SendPostModal>

        </div>
    );
};

export default Header;