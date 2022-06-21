import classes from '../styles/Login.module.css';
import Img from '../assest/live.png';
import {InputForm, InputPass} from '../componnet/Inputs';
import {ButtonForm} from '../componnet/Buttons';
import { AlertError } from '../componnet/Alerts';
import sanitizeHtml from 'sanitize-html';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useState } from 'react';
import Link from 'next/link';

function Login() {
    const [logData, setLogData] = useState({
        identifier: '',
        password: ''
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false); 
    
    const handleLogin = async (e) => {
        e.preventDefault();
        if (logData.identifier.length === 0 || logData.password.length === 0) {
            setErr('يجب ملأ الحقول');
        }else{
            setLoading(true);
            const res = await fetch('http://localhost:1337/api/auth/local', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData),
            });
            const result = await res.json();
            if (result?.error) {
                setErr('البريد الالكترونى او كلمة المرور');
            }
            if (result?.jwt) {
                setErr('');
                setLogData({
                    identifier: '',
                    password: ''
                })
                e.target.reset();
                
                setCookie('token', 'jwt', result.jwt, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
                setLoading(false);
                console.log('done !!');
            }
            console.log(result);
            setLoading(false);
        }
    } 

    return(
        <div className={classes.login_page}>
            <div className={classes.form_container}>
                <img src={Img.src}  alt="live" />
                <div className={classes.form}>
                    <form onSubmit={handleLogin}>
                        {err?.length > 0 && <AlertError errMsg={err} />}
                        <InputForm type="email" onChange={(e) => setLogData({...logData, identifier: sanitizeHtml(e.target.value)})} placeholder="البريد الالكترونى" />
                        <InputPass type="password" onChange={(e) => setLogData({...logData, password: sanitizeHtml(e.target.value)})} placeholder="كلمة المرور" />
                        <ButtonForm type="submit" loading={loading} disabled={loading}>
                            تسجيل الدخول
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

export default Login;