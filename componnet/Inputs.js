import classes from '../styles/Inputs.module.css';

export function Input({onChange, value, placeholder}) {
    return(
        <input type='text' className={classes.input} onChange={onChange} value={value} placeholder={placeholder} />
    )
}