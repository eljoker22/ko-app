import classes from '../styles/Home.module.css';
import Header from './Header';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/actions';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import TopHeader from './TopHeader';

function Layout({children}) {
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const token = parseCookies('token');
            const res = await fetch(`https://ko-app-sports.herokuapp.com/api/users/me`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token.jwt}`
                }
            }) 
            const user = await res.json();
            !user.error ?  dispatch(setUser(user)) : ''
        }
        getUser();
    }, [])
    return(
        <div>
            {router.pathname === '/register' ?
            <main className={classes.container_fluid}>
                {children}
            </main>
            : router.pathname === '/login' ? 
            <main className={classes.container_fluid}>
                {children}
            </main>
            :
            <main className={classes.container}>
                <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
                <TopHeader setOpenMenu={setOpenMenu} openMenu={openMenu} />
                {children}
            </main>
        }
        </div>
    )
}

export default Layout;