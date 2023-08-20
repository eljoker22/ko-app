import classes from '../styles/Login.module.css';
import {useState, useEffect } from 'react';
import {InputForm, InputPass} from '../componnet/Inputs';
import {ButtonForm} from '../componnet/Buttons';
import { AlertError, AlertSuccess } from '../componnet/Alerts';
import sanitizeHtml from 'sanitize-html';
import { parseCookies, setCookie } from 'nookies'
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { HiArrowNarrowLeft } from 'react-icons/hi';
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

function Register() {
    const [regData, setRegData] = useState({
        username: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
    });
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const registerAuth = async (e) => {
        e.preventDefault();
        const dataReq = {
            username: regData.username,
            email: regData.email,
            password: regData.password
        }

        if (regData.email.length < 8) {
            setErr('البريد الالكترونى غير صحيح');
        }else if (regData.email !== regData.emailConfirm) {
            setErr('البريد الألكترونى');
        }else if (regData.username.length < 3) {
            setErr('اسم المس');
        }else if (regData.password.length < 8) {
            setErr('كلمة المرور');
        }else if (regData.password !== regData.passwordConfirm) {
            setErr('كلمة المرور');
        }else{
            setLoading(true);
            const res = await fetch(`${process.env.nodeAppApi}/v1/auth/register`, {
                method: 'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataReq),
            })
            const result = await res.json();
            console.log(result);
            if (result?.error) {
                console.log(result.error.message)
                setErr(result.error)
                setLoading(false);
            }
            if (result.success) {
                setErr('');
                setSuccess('تأكد من كود تأكيد الحساب فى بريدك الألكترونى')
                setRegData({
                    username: '',
                    email: '',
                    emailConfirm: '',
                    password: '',
                    passwordConfirm: '',
                })
                e.target.reset();
                console.log('done !!');
                setLoading(false);
                router.push('/login');
            }
        }

    }

    console.log(parseCookies('token')?.jwt)
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
                <img src='/ko-logo.png' alt="live" />
                <div className={classes.form}>
                    {err?.length > 0 && <AlertError errMsg={err} />}
                    {success?.length > 0 && <AlertSuccess msg={success} />}

                    <form onSubmit={registerAuth}>
                        <InputForm type="email" onChange={(e) => setRegData({...regData, email: sanitizeHtml(e.target.value)})} placeholder="البريد الالكترونى" />
                        <InputForm type="email" onChange={(e) => setRegData({...regData, emailConfirm: sanitizeHtml(e.target.value)})} placeholder="تأكيد البريد الالكترونى" />
                        <InputForm type="text" onChange={(e) => setRegData({...regData, username: sanitizeHtml(e.target.value)})} placeholder="اسم المستخدم" />
                        <InputPass type="password" onChange={(e) => setRegData({...regData, password: sanitizeHtml(e.target.value)})} placeholder="كلمة المرور" />
                        <InputPass type="password" onChange={(e) => setRegData({...regData, passwordConfirm: sanitizeHtml(e.target.value)})} placeholder="تأكيد كلمة المرور" />
                        <ButtonForm disabled={loading} loading={loading} type="submit">
                            انشاء حساب
                        </ButtonForm>
                    </form>
                </div>
                <p className={classes.switch}>
                    لدى حساب بالفعل  <Link href='/login'><a>تسجيل دخول</a></Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
