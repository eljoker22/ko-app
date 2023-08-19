import classes from '../../styles/Profile.module.css';
import { ButtonForm } from '../../componnet/Buttons';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from 'next/router';
import nookies from 'nookies';

export async function getServerSideProps(ctx) {

    const token = nookies.get(ctx);
    const res = await fetch(`${process.env.nodeAppApi}/v1/auth/user`, {
        method: 'get',
        headers: {
            "x-access-token": `${token.jwt}`
        }
    }) 
    const user = await res.json();

    if (user.user.avatar) {
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

function AvatarSelect() {
    const avatars = ['Guacamole-1.png', 'No gravity-2.png', 'Teamwork-5.png', 'Upstream-1.png', 'Upstream-4.png', 'Upstream-6.png', 'Upstream-7.png', 'Upstream-8.png'];
    const [avatarSelect, setAvatarSelect] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = parseCookies('token').jwt;
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.replace('/login');
        }
    }, [])

    const choeseAvatar = async (e) => {
        e.preventDefault();
        if (avatarSelect) {
            setLoading(true);
            const res = await fetch(`${process.env.nodeAppApi}/v1/auth/user`, {
                method: 'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token": `${token}`
                },
                body: JSON.stringify(  {avatar: avatarSelect} )
            })

            console.log(res)
            if (res.status === 200) {
                router.replace('/profile');
                setLoading(false);
            }
            
        }
    }

    return(
        <div className={classes.avatar_select}>   
            <div className={classes.avatars_box}>
                <div className={classes.avatars}>
                {avatars.map((avatar) => (
                    <div key={avatar} className={avatarSelect === avatar ? classes.active : ''} onClick={() => setAvatarSelect(avatar)}>
                        <BsFillCheckCircleFill />
                        <img src={`/avatars/${avatar}`} alt='user' />
                    </div>
                ))}
                </div>
                <form onSubmit={choeseAvatar}>
                <ButtonForm type="submit" loading={loading} disabled={loading}>
                    اختيار الافاتار
                </ButtonForm>
                </form>
            </div>
        </div>
    )
}

export default AvatarSelect;