import classes from '../styles/Home.module.css';
import Header from './Header';
import { useRouter } from 'next/router';
function Layout({children}) {
    const router = useRouter();

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
                <Header />
                {children}
            </main>
        }
        </div>
    )
}

export default Layout;