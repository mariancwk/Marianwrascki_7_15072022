import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser, loginUser } from '../lib/api'

const SignUp = () => {
    let navigate = useNavigate()

    const AfterClick = async (e) => {
        const emailInput = document.getElementById('email').value
        const passwordInput = document.getElementById('password').value
        e.preventDefault()

        try {
            await signUpUser(emailInput, passwordInput)
            await loginUser(emailInput, passwordInput)
            navigate('/Feed')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form action="submit">
                <input type="text" id='email' placeholder='email' />
                <input type="text" id='password' placeholder='password'/>
                <button onClick={AfterClick} >S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;