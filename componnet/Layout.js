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
            console.log(token)
            if (token.jwt) {
                const res = await fetch(`${process.env.nodeAppApi}/v1/auth/user`, {
                    method: 'get',
                    headers: {
                        "x-access-token": `${token.jwt}`
                    }
                }) 
                const user = await res.json();
                if (user.success) {
                    dispatch(setUser(user.user))
                }
                console.log(user)
            }

        }
        getUser();
    }, [])
    return(
        <div>
            {router.pathname === '/register' || router.pathname === '/login' || router.pathname === '/forget-password' || router.pathname === '/reset-password' || router.pathname.includes('email-verify') ?
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