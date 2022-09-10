import classes from '../../styles/Login.module.css';
import {useState, useEffect } from 'react';
import Img from '../../assest/live.png';
import {InputForm, InputPass} from '../../componnet/Inputs';
import {ButtonForm} from '../../componnet/Buttons';
import { AlertError, AlertSuccess } from '../../componnet/Alerts';
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

function EmailVerify() {
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(null);
    const router = useRouter();

    const handleConfermRequest = async (e) => {
        e.preventDefault();
        if (code) {
            setLoading(true);
            const req = await fetch(`${process.env.nodeAppApi}/v1/auth/email-confermation`, {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: router.query.email, code: code})
            })
            const result = await req.json();
            console.log(result)
            if (result.error) {
                setLoading(false);
                setErr(result.error);
            }
            if (result.success) {
                setErr('');
                setSuccess('تم تأكيد حسابك');
                setLoading(false);
                router.push('/login');
            }
        }else{
            setErr('يجب ادخال الرمز');
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
                    {err?.length > 0 && <AlertError errMsg={err} />}
                    {success?.length > 0 && <AlertSuccess msg={success} />}
                    <p>ادخل رمز تأكيد الحساب الذى تلقيته على بريدك <strong>{router.query?.email}</strong></p>
                    <form onSubmit={handleConfermRequest}>
                        <InputForm type="text" onChange={(e) => setCode( sanitizeHtml(e.target.value) )} placeholder="ادخل الرمز الخاص بك" />
                        <ButtonForm disabled={loading} loading={loading} type="submit">
                            تأكيد الحساب
                        </ButtonForm>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify;