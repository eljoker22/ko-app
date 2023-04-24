import classes from '../styles/Login.module.css';
import Img from '../assest/live.png';
import {InputForm, InputPass} from '../componnet/Inputs';
import {ButtonForm} from '../componnet/Buttons';
import { AlertError } from '../componnet/Alerts';
import sanitizeHtml from 'sanitize-html';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useState } from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/actions';

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx).jwt;
    if (token) {
        return{
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

    return{
        props: {}
    }
}

console.log(process.env.nodeAppApi)

function Login() {
    const [logData, setLogData] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (logData.email.length === 0 || logData.password.length === 0) {
            setErr('يجب ملأ الحقول');
        }else{
            setLoading(true);
            const res = await fetch(`${process.env.nodeAppApi}/v1/auth/login`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData),
            });
            const result = await res.json();
            if (result?.error) {
                setErr(`${result.error}`);
                setLoading(false)
                if (result.error === 'تفقد بريدك الألكترونى للحصول على رمز تأكيد حسابك') {
                    router.push(`/email-verify/${logData.email}`);
                }
            }
            if (result?.token) {
                dispatch(setUser(result));
                router.replace('/');
                setErr('');
                setLogData({
                    email: '',
                    password: ''
                })
                //e.target.reset();
                
                setCookie('token', 'jwt', result.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
                //setLoading(false);
                //console.log('done !!');
            }
            console.log(result);
        }
    } 

    return(
        <div className={classes.login_page}>
            <div className={classes.back_link}>
                <Link href="/">
                    <a>
                        <div>
                            <span>الرئيسية</span>
                            <HiArrowNarrowLeft />
                        </div>
                    </a>
                </Link>
            </div>
            <div className={classes.form_container}>
                <img src={Img.src}  alt="live" />
                <div className={classes.form}>
                    <form onSubmit={handleLogin}>
                        {err?.length > 0 && <AlertError errMsg={err} />}
                        <InputForm type="email" onChange={(e) => setLogData({...logData, email: sanitizeHtml(e.target.value)})} placeholder="البريد الالكترونى" />
                        <InputPass type="password" onChange={(e) => setLogData({...logData, password: sanitizeHtml(e.target.value)})} placeholder="كلمة المرور" />
                        <ButtonForm type="submit" loading={loading} disabled={loading}>
                            تسجيل الدخول
                        </ButtonForm>
                    </form>
                    <Link href={`/forget-password`}>
                    <a className={classes.forgot_link}>نسيت كلمة السر؟</a>
                    </Link>
                </div>
                <p className={classes.switch}>
                    هل لديك حساب مسجل؟ <Link href='/register'><a>انشاء حساب</a></Link>
                </p>
            </div>
        </div>
    )
}

export default Login;