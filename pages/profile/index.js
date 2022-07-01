import classes from '../../styles/Profile.module.css';
import nookies from 'nookies';
import moment from 'moment';
import { ButtonFullWidth } from '../../componnet/Buttons';
import {MdError} from 'react-icons/md';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import Link from 'next/link';
export async function getServerSideProps(ctx) {

    const token = nookies.get(ctx);
    const res = await fetch(`${process.env.API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token.jwt}`
        }
    }) 
    const user = await res.json();

    // get user plan
    const planPeriod = user.plan === 'free' ? 'دائما' : user.plan === 'monthly' ? 'شهريا' : 'سنويا';
    const resPlan = await fetch(`${process.env.API_URL}/plans?filters[period][$eq]=${planPeriod}`);
    const plan = await resPlan.json();
    if (!user) {
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
    console.log(plan)
    const dateFix = moment(user.createdAt).format('l').split('/');
    const dateSign = `${dateFix[1]}/${dateFix[0]}/${dateFix[2]}`;
    console.log(dateSign);
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
                            <strong>البريد الالكترونى :</strong>
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
                            <strong>الخطة الشهرية</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>الوصول</span>
                            <strong>الوصول لكافة المباريات</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>الاعلانات</span>
                            <strong>لاتوجد اعلانات</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>السعر</span>
                            <strong>120EGP/سنويا</strong>
                        </div>
                        <div className={classes.item_plan}>
                            <span>حالة الأشتراك</span>
                            <div className={classes.active}>
                            <strong>
                            {`مفعل  `}
                            </strong>
                            <BsFillCheckCircleFill />
                            </div>
                        </div>
                        <Link href="/plans">
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