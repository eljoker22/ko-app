import classes from '../styles/Button.module.css';

export function Button({children, type}) {
    return(
        <button className={classes.btn} type={type}>
            {children}
        </button>
    )
}
export function ButtonForm({children, type, disabled, loading}) {
    
    return(
        <button className={`${classes.btn} ${classes.full}`} disabled={disabled} type={type}>
            {loading ? <div className={classes.loader}></div> : children}
        </button>
    )
}