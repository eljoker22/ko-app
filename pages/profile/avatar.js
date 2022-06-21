import classes from '../../styles/Profile.module.css';
import ava1 from '../../assest/avatars/Guacamole-1.png';
import ava2 from '../../assest/avatars/No gravity-2.png';
import ava3 from '../../assest/avatars/Teamwork-5.png';
import ava4 from '../../assest/avatars/Upstream-1.png';
import ava5 from '../../assest/avatars/Upstream-4.png';
import ava6 from '../../assest/avatars/Upstream-6.png';
import ava7 from '../../assest/avatars/Upstream-7.png';
import ava8 from '../../assest/avatars/Upstream-8.png';
import { ButtonForm } from '../../componnet/Buttons';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import {useRouter} from 'next/router';



function AvatarSelect() {
    const avatars = ['Guacamole-1.png', 'No gravity-2.png', 'Teamwork-5.png', 'Upstream-1.png', 'Upstream-4.png', 'Upstream-6.png', 'Upstream-7.png', 'Upstream-8.png'];
    const [avatarSelect, setAvatarSelect] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = parseCookies('token').jwt;
    const router = useRouter();

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
    console.log(token);
    console.log(JSON.stringify( {plan: 'free',} ))
    return(
        <div className={classes.avatar_select}>   
            <div className={classes.avatars_box}>
                <div className={classes.avatars}>
                {avatars.map((avatar) => (
                    <div className={avatarSelect === avatar ? classes.active : ''} onClick={() => setAvatarSelect(avatar)}>
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