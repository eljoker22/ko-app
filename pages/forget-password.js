import classes from '../styles/Login.module.css';
import {InputForm, InputPass} from '../componnet/Inputs';
import {ButtonForm} from '../componnet/Buttons';
import { AlertError, AlertSuccess } from '../componnet/Alerts';
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

function ForgetPassword() {
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); 
    const [email, setEmail] = useState('');

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(email)
        if (email.length > 0) {
            const req = await fetch(`${process.env.nodeAppApi}/v1/auth/forgot-password`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email}),
            });
            const result = await req.json();
            if (result.error) {
                setErr(result.error);
                setLoading(false)
            }
            if (result.success) {
                setSuccess('تأكد من صندوق الوارد فى بريدك الالكترونى ستجد رابط تغيير كلمة المرور');
                setLoading(false)
            }
            console.log(result)
        }else{
            setErr('يجب ادخال البريد')
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
                <img src='/ko logo.png' alt="ko" />
                <div className={classes.form}>
                    {err?.length > 0 && <AlertError errMsg={err} />}
                    {success?.length > 0 && <AlertSuccess msg={success} />}
                    <form onSubmit={handleForgetPassword}>
                        <InputForm type="email" onChange={(e) => setEmail( sanitizeHtml(e.target.value) )} placeholder="البريد الالكترونى" />
                        <ButtonForm type="submit"  loading={loading} disabled={loading}>
                            ارسال رابط تغيير كلمة المرور
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

export default ForgetPassword;