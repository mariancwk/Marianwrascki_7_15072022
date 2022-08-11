import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser, loginUser } from '../../lib/api'
import ApiAlerts from '../ApiAlerts/ApiAlerts';
import FormInput from '../FormInput/FormInput';
import './SignUp.css'

let isSending = false

const SignUp = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const HandleSubmit = async (e) => {
        e.preventDefault()
        isSending = true

        try {
            await signUpUser(email, password)
            await loginUser(email, password)
            isSending = false
            navigate('/Feed')

        } catch (error) {
            isSending = false
            console.log(error)
            setErrorMsg(error.response.data.error)
        }
    }

    return (
        <div className='signUp-form' >
            <h2>Let's go !</h2>
            <form onSubmit={HandleSubmit} >
                <FormInput
                id="email"
                type="text" 
                placeholder="Email" 
                setValue={setEmail}
                errorMsg="Votre email n'est pas valide ou n'est pas du domaine '@groupomania.fr'"
                pattern=".(\w\.?)+@groupomania\.[a-z]{2,3}"/>
                        
                <FormInput
                id="password" 
                type="password" 
                placeholder="Mot de passe"
                setValue={setPassword}
                errorMsg="Minimum de 8 caractères et maximum de 30 avec une majuscule, un chiffre et un caractère spécial"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* )(?=.*[!@#$%^&*_=+-]).{8,30}\S*$"
                required="true"/>

                <button className={`btn btn-primary ${isSending ? "loading" : ""}`}
                disabled={!email || !password} >S'inscrire</button>
            </form>

            <ApiAlerts errorMsg={errorMsg} />
        </div>
    );
};

export default SignUp;