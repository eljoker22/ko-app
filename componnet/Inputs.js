import classes from '../styles/Inputs.module.css';
import {VscEye} from 'react-icons/vsc';
import {VscEyeClosed} from 'react-icons/vsc';
import { useState } from 'react';

export function Input({onChange, value, placeholder}) {
    return(
        <input type='text' className={classes.input} onChange={onChange} value={value} placeholder={placeholder} />
    )
}
export function InputForm({onChange, value, placeholder, type}) {
    return(
        <input type={type} className={`${classes.input} ${classes.input_form}`} onChange={onChange} value={value} placeholder={placeholder} />
    )
}
export function InputPass({onChange, value, placeholder, type}) {
    const [showPass, setShowPass] = useState(false);
    return(
        <div className={classes.input_pass}>
            <input type={showPass ? 'text' : 'password'} className={`${classes.input} ${classes.input_form}`} onChange={onChange} value={value} placeholder={placeholder} />
            {showPass ? <VscEyeClosed onClick={() => setShowPass(!showPass)} /> : <VscEye onClick={() => setShowPass(!showPass)} />}
        </div>
    )
}