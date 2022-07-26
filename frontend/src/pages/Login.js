import React from 'react'
import { loginUser } from '../lib/api'
import { useNavigate } from "react-router-dom"

const Login = () => {
    let navigate = useNavigate()
    
    const HandleSubmit =  async (e) => {

        e.preventDefault()
        const emailInput = document.getElementById('email').value
        const passwordInput = document.getElementById('password').value
        await loginUser(emailInput, passwordInput)
        navigate("/Feed")

    }

    return (
        <div>
            <form onSubmit={HandleSubmit} action="submit">
                <input type="text" id='email' placeholder='email' />
                <input type="text" id='password' placeholder='password'/>
                <button>Se connecter</button>
            </form>
        </div>
    );
};

export default Login;