import classes from '../../styles/Profile.module.css';
import nookies from 'nookies';
import moment from 'moment';
import { ButtonFullWidth } from '../../componnet/Buttons';
import {MdError} from 'react-icons/md';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export async function getServerSideProps(ctx) {

    const token = nookies.get(ctx);

    if (!token.jwt) {
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const url = process.env.nodeAppApi;
    const res = await fetch(`${url}/v1/auth/user`, {
        method: 'get',
        headers: {
            "x-access-token": `${token?.jwt}`
        }
    }) 
    const userRes = await res.json();
    const {user} = userRes;
    // get user plan
    const planPeriod = user.plan === 'free' ? 'دائما' : user.plan === 'monthly' ? 'شهريا' : 'سنويا';
    const resPlan = await fetch(`${process.env.API_URL}/plans?filters[period][$eq]=${planPeriod}`);
    const plan = await resPlan.json();
    if (user.error) {
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if (!user.avatar) {
        return{
            redirect: {
                destination: '/profile/avatar',
                permanent: false
            }
        }
    }
    return{
        props: {user: user, plan: plan}
    }
}

function Profile({user, plan}) {
    console.log(user.subscriptionEndDate);
    const [statusSub, setStatusSub] = useState(true);
    const today = new Date().getTime();
    const renewTime = new Date(user.subscriptionEndDate).getTime();
    const dateFix = moment(user.createdAt).format('l').split('/');
    const dateSign = `${dateFix[1]}/${dateFix[0]}/${dateFix[2]}`;
    const dateEndSubFix = moment(user.subscriptionEndDate).format('l').split('/');
    const dateEndSub = `${dateEndSubFix[1]}/${dateEndSubFix[0]}/${dateEndSubFix[2]}`;
    console.log(dateSign);

    useEffect(() => {
        const checkStatusSubscription = () => { // set Status Subscription
            if (user.plan === 'free') {
                setStatusSub(true);
            } else{
                if (today > renewTime) {
                    setStatusSub(false)
                }else{
                    setStatusSub(true);
                }
            }
        }
        checkStatusSubscription();
    },[])

    return(
        <div className={classes.profile_page}>
            <div className={classes.profile}>
                <div>
                    <h2>حسابى</h2>
                    <div className={classes.avatar}>
                        <img src={`avatars/${user.avatar}`} />
                        <strong>{user.username}</strong>
                    </div>
                    <div className={classes.info}>
                        <h2>معلومات الحساب</h2>
                        <div>
                            <strong>البريد الالكترونى:</strong>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <strong>الاسم :</strong>
                            <span>{user.username}</span>
                        </div>
                        <div>
                            <strong>تاريخ التسجيل :</strong>
                            <span>{dateSign}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>معلومات اشتراكك</h2>
                    <div className={classes.plan_box}>
                        <div className={classes.head_plan}>
                            <img src="/play.png" />
                            <strong>{plan.data[0]?.attributes.name}</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>الوصول</span>
                            <strong>{plan.data[0]?.attributes.access ? 'الوصول لكافة المباريات' : 'الوصول للمباريات المجانية'}</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>الاعلانات</span>
                            <strong>{plan.data[0]?.attributes.no_ads ? 'لاتوجد اعلانات' : 'توجد اعلانات'}</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>السعر</span>
                            <strong>{`${plan.data[0]?.attributes.price}EGP/${plan.data[0]?.attributes.period}`}</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>تاريخ التجديد</span>
                            <strong>{`${user.plan === 'free' ? 'دائما' : dateEndSub }`}</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>حالة الأشتراك</span>
                                <div className={statusSub ? classes.active : ''}>
                                <strong>
                                {statusSub ? 'مفعل' : 'غير مفعل'}
                                </strong>
                                {statusSub ? <BsFillCheckCircleFill /> : <MdError />}
                            </div>
                        </div>
                        <Link href="/subscription">
                            <a>
                                <ButtonFullWidth>
                                    تغيير
                                </ButtonFullWidth>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;