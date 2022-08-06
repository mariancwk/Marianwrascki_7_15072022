import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser, loginUser } from '../../lib/api'
import FormInput from '../FormInput/FormInput';
import './SignUp.css'

const SignUp = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            await signUpUser(email, password)
            await loginUser(email, password)
            navigate('/Feed')

        } catch (error) {
            console.log(error)
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

                <button className="btn btn-primary" >S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;