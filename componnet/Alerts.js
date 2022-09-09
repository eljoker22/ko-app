import classes from '../styles/Alert.module.css';
import errImg from '../assest/warning.png';
import sucImg from '../assest/check-mark.png';

export function AlertError({errMsg}) {
    return(
        <div className={`${classes.alert} ${classes.alert_err}`}>
            <img src={errImg.src} alt='error' />
            <span>{errMsg}</span>
        </div>
    )
}

export function AlertSuccess({msg}) {
    return(
        <div className={`${classes.alert} ${classes.alert_success}`}>
            <img src={sucImg.src} alt='success' />
            <span>{msg}</span>
        </div>
    )
}