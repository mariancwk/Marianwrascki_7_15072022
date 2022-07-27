import React, { useState } from 'react'
import { loginUser } from '../lib/api'
import { useNavigate } from "react-router-dom"
import Logo from '../components/Logo/Logo';
import SignUpModal from '../components/SignUpModal';
import SignUp from '../components/SignUp/SignUp';

const Login = () => {
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    
    const HandleSubmit =  async (e) => {

        e.preventDefault()
        const emailInput = document.getElementById('email').value
        const passwordInput = document.getElementById('password').value
        await loginUser(emailInput, passwordInput)
        navigate("/Feed")

    }

    return (
        <div className='login-page' >
            <Logo />
            <div className="login-container">
                <form className='login-form' onSubmit={HandleSubmit} action="submit">
                    <input className='input' type="text" id='email' placeholder='email' />
                    <input className='input' type="text" id='password' placeholder='password'/>
                    <button className="btn btn-primary">Se connecter</button>
                </form>

                <button className='btn btn-outline btn-secondary modal-button' /*onClick={ () => {navigate('/SignUp')} }*/ onClick={() => setIsOpen(true)} >S'inscrire</button>

                <div>
                <SignUpModal 
                    open={isOpen} 
                    onClose={() => setIsOpen(false)} >
                        <SignUp/>
                </SignUpModal>

                </div>
            </div>
        </div>
    );
};

export default Login;