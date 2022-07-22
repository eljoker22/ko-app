import classes from '../../styles/Profile.module.css';
import { ButtonForm } from '../../componnet/Buttons';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from 'next/router';




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
            const res = await fetch('http://localhost:1337/api/user/updateLoggedInUser', {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify( {data: {avatar: avatarSelect}} )
            })

            if (res.status === 200) {
                router.replace('/profile');
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
                        <img src={`/avatars/${avatar}`} />
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