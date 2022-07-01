import classes from '../styles/Popups.module.css';
import {Player} from '@lottiefiles/react-lottie-player';
import lottieImg from '../assest/lottie/42183-congratulation-success-batch (1).json';
import {ButtonRadius} from './Buttons';
export function Popup() {
    return(
        <div>
            <div className={classes.overlay}>

            </div>
            <div className={classes.popup}>
                popup test
            </div>
        </div>
    )
}

export function PopupSubscripe({plan}) {
    console.log(lottieImg)
    return(
        <div>
            <div className={classes.overlay}>

            </div>
            <div className={classes.popup}>
                <Player
                    autoplay
                    loop
                    src={lottieImg}
                    style={{ height: '300px', width: '500px' }}
                    >
                </Player>
                <div className={classes.text}>
                    <h3>تهانينا !</h3>
                    <p>{`لقد اتممت اشتراكك فى ${plan}`}</p>
                    <ButtonRadius>
                        الذهاب للرئيسية
                    </ButtonRadius>
                </div>
            </div>
        </div>
    )
}