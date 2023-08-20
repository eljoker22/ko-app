import { Button } from '../componnet/Buttons';
import { CostumImage } from '../componnet/Images';
import classes from '../styles/Download.module.css';

function DownloadApp() {
    return(
        <div>
            <div className={classes.banner}>
            <CostumImage 
                src='/ko-Sports-app-banner.png'
            />
            </div>
            <div className={classes.content}>
                <img src='/ko-logo.png' alt='ko' />
                <p>موطن الرياضات العالمية شاهد اهم دوريات كرة القدم وبطولات الملاكمة وقتالات ufc</p>
                <Button type={'button'}>
                    تحميل التطبيق
                </Button>
            </div>
            
        </div>
    )
}

export default DownloadApp;