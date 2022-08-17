import React, { useState } from 'react';
import './FormInput.css'

// Variable form input who allows a form cheking
const FormInput = (props) => {
    const [leaveInput, setLeaveInput] = useState(false)

    const HandleLeave = () => {
        setLeaveInput(true)
    }

    return (
        <div className='formInput' >
            <input 
            id={props.id}
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={(e) => props.setValue(e.target.value)} 
            pattern={props.pattern}
            className="input"
            onBlur={HandleLeave}
            leaved={leaveInput.toString()}
            required
            aria-label={props.arialabel} />
            <span> {props.errorMsg} </span>
        </div >
    );
};

export default FormInput;