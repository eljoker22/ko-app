import classes from '../styles/Plans.module.css';
import {ImRadioUnchecked, ImRadioChecked2} from 'react-icons/im';
import {FaCcVisa} from 'react-icons/fa';
import {ImPaypal} from 'react-icons/im';
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
    const [paymentSelect, setPaymentSelect] = useState('بطاقة الأئتمان');
    const [popupSuccess, setPopupSuccess] = useState(false);
    const payments = [
        {
            name: 'بطاقة الأئتمان',
            icon: <FaCcVisa />,
        },
        {
            name: 'بايبال',
            icon: <ImPaypal />,
        }
    ]
    
    return(
        <div className={classes.plans_page}>
            {popupSuccess && <PopupSubscripe plan={planSelect}></PopupSubscripe>}
            <h1>ابدأ اشتراكك الأن</h1>
            <div className={classes.plans}>
                <h3><span>1</span> اختر الخطة</h3>
                {plans.data.map((plan) => (
                    <div 
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

            {paymentSelect === 'بايبال' ? 
                        <PayPalScriptProvider options={{ 
                            "client-id": "AQFiIarA9Ec2ZegTb-o7CKmDJ6nL3Paw-zfOXbX7aSp9lqnIU8NiNNze1JOm-L5v0RyZ8_X_dRgwzf8f",
                            "disable-funding": "credit,card",
                            "vault": "true"
                        }}>
                        <PayPalButtons
                            disabled={planSelect === 'الخطة المجانية' ? true : false}
                            style={{"color":"gold","height":55,"shape": "rect"}}
                            createSubscription={(data, actions) => {
                                return actions.subscription.create({
                                    plan_id: 'P-9H409299XA8150024MJ6VBKQ'
                                });
                            }}
                            onApprove={async (data, actions) => {
                                console.log(data)
                                const res = await fetch('/api/paypalSubscription', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        token: token,
                                        subscriptionId: data.subscriptionID,
                                        plan: planSelect === 'الخطة الشهرية' ? 'monthly' : 'yearly'
                                    })
                                })
                                if (res.status === 200) {
                                    setPopupSuccess(true);
                                }
                            }}
                        />
                    </PayPalScriptProvider>
                    :
                    <form>
                        <ButtonForm type="submit">
                            اشتراك
                        </ButtonForm>
                    </form>
                    }
        </div>
    )
}

export default PlansPage;