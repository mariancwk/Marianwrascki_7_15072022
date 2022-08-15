import React, { useEffect, useState } from 'react'
import { loginUser } from '../../lib/api'
import { useNavigate } from "react-router-dom"
import Logo from '../../components/Logo/Logo';
import SignUpModal from '../../components/Modals/SignUpModal';
import SignUp from '../../components/SignUp/SignUp';
import FormInput from '../../components/FormInput/FormInput';
import './Login.css'
import ApiAlerts from '../../components/ApiAlerts/ApiAlerts';

let isSending = false

// Allows a user to log to his account
const Login = () => {
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    // Allows to call axios post function
    const HandleSubmit =  async (e) => {
        e.preventDefault()
        isSending = true

        try {
            await loginUser(email, password)
            isSending = false
            navigate("/Feed")
        } catch (error) {
            isSending = false
            console.log(error)
            setErrorMsg(error.response.data.error)
        }
    }

    return (
        <div className='login-page' >
            <Logo />
            <div className="login-container">
                <form 
                className='login-form' 
                onSubmit={HandleSubmit} >
                    <FormInput 
                    type="text" 
                    placeholder="Email" 
                    setValue={setEmail}
                    errorMsg="Votre email n'est pas valide"
                    pattern=".(\w\.?)+@groupomania\.[a-z]{2,3}"/>
                    
                    <FormInput 
                    type="password" 
                    placeholder="Mot de passe"
                    setValue={setPassword}
                    errorMsg="Minimum de 8 caractères et maximum de 30 avec une majuscule, un chiffre et un caractère spécial"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* )(?=.*[!@#$%^&*_=+-]).{8,30}\S*$"
                    required="true"/>

                    <button 
                    className={`btn btn-primary ${isSending ? "loading" : ""}`} 
                    disabled={!email || !password} >Se connecter</button>
                </form>

                <button 
                className='btn btn-outline btn-secondary modal-button' 
                onClick={() => setIsOpen(true)}>S'inscrire
                </button>

                <SignUpModal 
                    open={isOpen} 
                    onClose={() => setIsOpen(false)} >
                    <SignUp/>
                </SignUpModal>

                <ApiAlerts errorMsg={errorMsg} />
            </div>
        </div>
    );
};

export default Login;