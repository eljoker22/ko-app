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

function TopHeader({setOpenMenu, openMenu}) {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const user = useSelector(state => state.user);
    const router = useRouter();
    const token = parseCookies('token');
    const dispatch = useDispatch();

        useEffect(() => {
            setOpenUserMenu(false);
        }, [router.pathname]);

        useEffect(() => {

        }, [])

        console.log(token);
        
        const logout = () => {
            destroyCookie(null, 'jwt');
            dispatch(setUser(null));
            setTimeout(() => router.reload(), 1000);
        }
        console.log('redux' ,user);
    return(
        <header className={classes.top_header}>
            <div onClick={() => setOpenMenu(false)} className={`${classes.overlay} ${openMenu ? classes.active : ''}`}></div>
            <div className={classes.side_right}>
                <RiMenu4Fill className={classes.bars} onClick={() => setOpenMenu(true)} />
                header                    
            </div>
            
            <div className={classes.user}>
                <BsChatDots />
                <RiNotification2Line />
                {user ? 
                <>
                <img src={`/avatars/${user?.avatar}`} onClick={() => setOpenUserMenu(!openUserMenu)} />
                <div className={`${classes.box_user} ${openUserMenu ? classes.active : ''}`}>
                    <div className={classes.link_user}>
                            <img src={`/avatars/${user?.avatar}`} />
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
                : 
                <Link href="/login">
                    <a>
                        <Button>تسجيل الدخول</Button>
                    </a>
                </Link>
                }
            </div>
        </header>
    )
}

export default TopHeader;