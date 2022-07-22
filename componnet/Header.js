import classes from '../styles/Header.module.css';
import Link from 'next/link';
import {AiOutlineTrophy} from 'react-icons/ai';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlineContactSupport} from 'react-icons/md';
import {BiUserCircle} from 'react-icons/bi';
import {RiBoxingLine} from 'react-icons/ri';
import {SiUfc} from 'react-icons/si';
function Header({openMenu}) {
    return(
        <header className={`${classes.header} ${openMenu ? classes.active : ''}`}>
            <h1 style={{color: 'var(--primary)'}}>KORA SPORTS</h1>
            <ul>
                <Link href="/">
                    <a><li>
                        <AiOutlineHome />
                        <span>الرئيسية</span>
                    </li></a>
                </Link>
                <Link href="/">
                    <a><li>
                        <AiOutlineTrophy />
                        <span>البطولات</span>
                    </li></a>
                </Link>
                <Link href="/">
                    <a><li>
                        <SiUfc />
                        <span>بطولة UFC</span>
                    </li></a>
                </Link>
                <Link href="/">
                    <a><li>
                        <RiBoxingLine />
                        <span>الملاكمة</span>
                    </li></a>
                </Link>
                <Link href="/">
                    <a><li>
                        <MdOutlineContactSupport />
                        <span>المساعدة</span>
                    </li></a>
                </Link>
                <Link href="/">
                    <a><li>
                        <BiUserCircle />
                        <span>حسابى</span>
                    </li></a>
                </Link>
            </ul>
        </header>
    )
}

export default Header;