import classes from '../styles/Header.module.css';
import Link from 'next/link';

function Header() {
    return(
        <header className={classes.header}>
            <h1 style={{color: 'var(--primary)'}}>KORA SPORTS</h1>
            <ul>
                <Link href="/">
                    <a><li>الرئيسية</li></a>
                </Link>
                <Link href="/">
                    <a><li>الرئيسية</li></a>
                </Link>
                <Link href="/">
                    <a><li>الرئيسية</li></a>
                </Link>
                <Link href="/">
                    <a><li>الرئيسية</li></a>
                </Link>
            </ul>
        </header>
    )
}

export default Header;