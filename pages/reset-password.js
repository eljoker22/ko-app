import classes from '../styles/Login.module.css';
import {InputForm, InputPass} from '../componnet/Inputs';
import {ButtonForm} from '../componnet/Buttons';
import { AlertError, AlertSuccess } from '../componnet/Alerts';
import sanitizeHtml from 'sanitize-html';
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

function ResetPassword() {
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); 
    const [password, setPassword] = useState('');
    const [confermPassword, setConfermPassword] = useState('');
    const router = useRouter();
    const { query } = router;
    const handleResetPassword = async (e) => {
        e.preventDefault();
        console.log(router.query.token);
        console.log(password);
        if (password.length > 0 && password === confermPassword) {
            setLoading(true)
            const req = await fetch(`${process.env.nodeAppApi}/v1/auth/reset-password`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: query.email,
                    token: query.token,
                    password: password
                }),
            });
            const result = await req.json();
            if (result.error) {
                setErr(result.error);
                setLoading(false)
            }
            if (result.success) {
                setLoading(false)
                setSuccess('تم تغيير كلمة السر الخاصة بك');
                router.replace('/login')
            }
        }else{
            setErr('كلمة السر غير متطابقة')
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
                <img src='/ko-logo.png' alt="live" />
                <div className={classes.form}>
                    {err?.length > 0 && <AlertError errMsg={err} />}
                    {success?.length > 0 && <AlertSuccess msg={success} />}
                    <form onSubmit={handleResetPassword}>
                        <InputPass type="password" onChange={(e) => setPassword( sanitizeHtml(e.target.value) )}  placeholder="كلمة السر الجديدة" />
                        <InputPass type="password" onChange={(e) => setConfermPassword( sanitizeHtml(e.target.value) )}  placeholder="كلمة السر الجديدة" />
                        <ButtonForm type="submit" loading={loading} disabled={loading}>
                            تغيير كلمة السر
                        </ButtonForm>
                    </form>
                </div>
                <p className={classes.switch}>
                    هل لديك حساب مسجل؟ <Link href='/register'><a>انشاء حساب</a></Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword;