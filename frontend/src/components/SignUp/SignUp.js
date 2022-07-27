import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser, loginUser } from '../../lib/api'
import './SignUp.css'


const SignUp = () => {
    let navigate = useNavigate()
    const [state, setState] = useState({
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        const value = e.target.value

        setState({
            ...state,
            [e.target.name]: value
        })
    }

    const AfterClick = async (e) => {
        
        // const emailInput = document.getElementById('email').value
        // const passwordInput = document.getElementById('password').value
        e.preventDefault()


        try {
            await signUpUser(state.email, state.password)
            await loginUser(state.email, state.password)
            navigate('/Feed')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='signUp-form' >
            <h2>Let's go !</h2>
            <form action="submit">
                <input 
                className='input' 
                type="text" 
                name='email' 
                placeholder='email' 
                value={state.name}
                onChange={handleChange}
                />
                <input 
                className='input' 
                type="text" 
                name='password' 
                placeholder='password' 
                value={state.name}
                onChange={handleChange}
                />
                <button className="btn btn-primary" onClick={AfterClick} >S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;