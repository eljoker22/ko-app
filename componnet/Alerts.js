import classes from '../styles/Alert.module.css';
import errImg from '../assest/warning.png';

export function AlertError({errMsg}) {
    return(
        <div className={classes.alert_err}>
            <img src={errImg.src} alt='error' />
            <span>{errMsg}</span>
        </div>
    )
}