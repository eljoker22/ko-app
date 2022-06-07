import classes from '../styles/Home.module.css';
import Header from './Header';
function Layout({children}) {
    return(
        <div>
            <main className={classes.container}>
                <Header />
                {children}
            </main>
        </div>
    )
}

export default Layout;