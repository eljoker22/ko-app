import classes from '../styles/Plans.module.css';
import {ImRadioUnchecked, ImRadioChecked2} from 'react-icons/im';
import {SiVodafone} from 'react-icons/si';
import { useState } from 'react';
import { ButtonForm } from '../componnet/Buttons';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import { parseCookies } from 'nookies';
import {Popup, PopupSubscripe} from '../componnet/Popups';

export async function getServerSideProps() {
    
    const res = await fetch(`${process.env.API_URL}/plans`);
    const plans = await res.json();

    return{
        props: {plans: plans}
    }
}

function PlansPage({plans}) {
    const token = parseCookies('token').jwt;
    const [planSelect, setPlanSelect] = useState('الخطة المجانية');
    const [paymentSelect, setPaymentSelect] = useState('فودافون كاش');
    const [popupSuccess, setPopupSuccess] = useState(false);
    const payments = [
        {
            name: 'فودافون كاش',
            icon: <SiVodafone />,
        },
    ]
    
    return(
        <div className={classes.plans_page}>
            {popupSuccess && <PopupSubscripe plan={planSelect}></PopupSubscripe>}
            <h1>ابدأ اشتراكك الأن</h1>
            <div className={classes.plans}>
                <h3><span>1</span> اختر الخطة</h3>
                {plans.data.map((plan) => (
                    <div 
                        key={plan.attributes.name}
                        className={`${classes.plan} ${plan.attributes.name === planSelect ? classes.active : ''}`}
                        onClick={() => setPlanSelect(plan.attributes.name)}>
                        {planSelect === plan.attributes.name ? <ImRadioChecked2 /> : <ImRadioUnchecked /> }
                        <div>
                            <strong>{plan.attributes.name}</strong>
                            <p>{`${plan.attributes.no_ads ? 'بدون اعلانات' : 'يوجد اعلانات'} , ${plan.attributes.access ? 'وصول لجميع المباربات' : 'وصول للمباريات المجانية فقط'}`}</p>
                        </div>
                        <div>
                            <span className={classes.price}>{`${plan.attributes.price}EGP/${plan.attributes.period}`}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.payment_method}>
                <h3><span>2</span> اختر وسيلة دفع</h3>
                {payments.map((payment) => (
                    <div
                        key={payment.name}
                        className={`${classes.method} ${payment.name === paymentSelect ? classes.active : ''}`}
                        onClick={() => setPaymentSelect(payment.name)}
                    >
                        {payment.name === paymentSelect ? <ImRadioChecked2 /> : <ImRadioUnchecked />}
                        <div>
                            <strong>{payment.name}</strong>
                        </div>
                        <div>
                            <span>{payment.icon}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form>
                <ButtonForm type="submit">
                    اشتراك
                </ButtonForm>
            </form>
        </div>
    )
}

export default PlansPage;