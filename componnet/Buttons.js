import classes from '../styles/Button.module.css';

export function Button({children, type}) {
    return(
        <button type={type}>
            {children}
        </button>
    )
}