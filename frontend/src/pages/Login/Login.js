import React, { useState } from 'react'
import { loginUser } from '../../lib/api'
import { useNavigate } from "react-router-dom"
import Logo from '../../components/Logo/Logo';
import Modal from '../../components/Modal';
import SignUp from '../../components/SignUp/SignUp';
import FormInput from '../../components/FormInput/FormInput';
import './Login.css'

const Login = () => {
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const HandleSubmit =  async (e) => {
        e.preventDefault()

        try {
            await loginUser(email, password)
            navigate("/Feed")
        } catch (error) {
            console.log(error)
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

                    <button className="btn btn-primary">Se connecter</button>
                </form>

                <button 
                className='btn btn-outline btn-secondary modal-button' 
                onClick={() => setIsOpen(true)} >S'inscrire
                </button>

                <div>
                <Modal 
                    open={isOpen} 
                    onClose={() => setIsOpen(false)} >
                    <SignUp/>
                </Modal>

                </div>
            </div>
        </div>
    );
};

export default Login;