import classes from '../styles/Header.module.css';
import {useSelector} from 'react-redux';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlineContactSupport} from 'react-icons/md';
import {RiLogoutCircleRLine} from 'react-icons/ri';
import {BiUserCircle} from 'react-icons/bi';
import {RiNotification2Line} from 'react-icons/ri';
import {BsChatDots} from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies';
import { Button } from './Buttons';
import {RiMenu4Fill} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/actions';
import Image from 'next/image';

function TopHeader({setOpenMenu, openMenu}) {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const user = useSelector(state => state.user);
    const [userData, setUserData] = useState(null); 
    const router = useRouter();
    const token = parseCookies('token');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            setOpenUserMenu(false);
        }, [router.pathname]);

        useEffect(() => {
            setLoading(false);
            setUserData(token.jwt ? 'userExist' : 'userNotExist');
        }, [user])

        console.log(token);
        
        const logout = () => {
            destroyCookie('token', 'jwt');
            dispatch(setUser(null));
            router.replace('/')
            //setTimeout(() => router.reload(), 1000);
        }

        console.log('redux' ,user);


    return(
        <header className={classes.top_header}>
            <div onClick={() => setOpenMenu(false)} className={`${classes.overlay} ${openMenu ? classes.active : ''}`}></div>
            <div className={classes.side_right}>
                <RiMenu4Fill className={classes.bars} onClick={() => setOpenMenu(true)} />
                <img className={classes.icon_ko} src='/icon1.png' alt='ko' />
            </div>
            
            <div className={classes.user}>
                <BsChatDots />
                <RiNotification2Line />
                    
                    { user ? 
                    <>
                    <div className={classes.container_img}>
                    <Image 
                        layout="fill"
                        src={`/avatars/${user.avatar ? user.avatar : 'user.png'}`} 
                        alt="user" 
                        onClick={() => setOpenUserMenu(!openUserMenu)} 
                    />
                    </div>
                    <div className={`${classes.box_user} ${openUserMenu ? classes.active : ''}`}>
                        <div className={classes.link_user}>
                                <img src={`/avatars/${user.avatar ? user.avatar : 'user.png'}`} />
                                <div>
                                <strong>{user?.username}</strong>
                                </div>
                        </div>
                        <ul>
                            <Link href="/profile"><a>
                            <li><BiUserCircle /><span>حسابي</span></li>
                            </a></Link>
                            <Link href="/"><a>
                            <li><AiOutlineHome /><span>الرئيسية</span></li>
                            </a></Link>
                            <Link href="/"><a>
                            <li><MdOutlineContactSupport /><span>المساعدة</span></li>
                            </a></Link>
                            
                            <li onClick={logout} className={classes.logout}><RiLogoutCircleRLine /><span>تسجيل الخروج</span></li>
                        </ul>
                    </div> 
                    </>
                    : userData === 'userNotExist' ?
                    <Link href="/login">
                        <a>
                            <Button>تسجيل الدخول</Button>
                        </a>
                    </Link>
                    : ''
                    }
            </div>
        </header>
    )
}

export default TopHeader;