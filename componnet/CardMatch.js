import classes from '../styles/Card.module.css';
import moment from 'moment/min/moment-with-locales';
import {FaLockOpen} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';
import {FaArrowLeft} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { CostumImage } from './Images';
import { useRouter } from 'next/router';

//import 'ds'
function CardMatch({matches, logoLeague}) {
    const isMobScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const isSmallScreen = useMediaQuery({ query: '(max-width: 412px)' });
    const router = useRouter();
    return(
        <>
            {isMobScreen && router.route !== '/league/[slug]' ? 
                    <motion.div layout>
                        <Swiper
                        spaceBetween={10}
                        slidesPerView={isSmallScreen ? 1 : 2}>
                            {matches.map((match) => (
                                <SwiperSlide key={match.sys.id}>
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ ease: "easeOut", duration: 0.5 }}
                                        className={classes.card}>

                                        <div className={classes.thumbnail}>

                                            {match.fields.free ?          
                                            <div className={classes.free_status}>
                                                <FaLockOpen />
                                            </div>
                                            : 
                                            <div className={classes.free_status}>
                                                <FaLock />
                                            </div>}

                                            <div className={classes.time}>
                                                <div className={classes.day}>
                                                    <strong>
                                                        {moment(match.fields.time).format('Do').replace(/[a-z]/g, '')}
                                                    </strong>
                                                    {/* <span>
                                                        {//moment(match.fields.time).locale('ar').format('MMM')}
                                                    </span>  */}

                                                </div>
                                                <div className={classes.hour}>
                                                    {moment(match.fields.time).format('h:mm')}
                                                </div>
                                            </div>
                                            <CostumImage 
                                                src={`${match.fields?.thumbnail?.fields.file.url.replace('//', 'https://')}`}
                                            />
                                        </div>

                                        <div>
                                            <strong className={classes.title}>{match.fields.title}</strong>
                                            <div className={classes.logos}>
                                                <img src={`${match.fields?.logo1?.fields.file.url}`} alt='logo' />
                                                <img src={`/vs.png`} alt='vs' />
                                                <img src={`${match.fields?.logo2?.fields.file.url}`} alt='logo' />
                                            </div>
                                        </div>
                                        
                                        <div className={classes.bottom_card}>
                                            <div className={classes.league_logo}>
                                            <img src={match.fields.league ? `${match.fields?.league.fields.logo.fields.file.url}` : logoLeague} alt='league' />
                                            </div>
                                            <Link href={`/live/${match.sys.id}`}>
                                                <a>
                                                    <div className={classes.btn_view}>
                                                        <strong>مشاهدة</strong>
                                                        <FaArrowLeft />
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>

                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                    : 
                    <motion.div layout className={classes.cards}>
                    {matches.map((match) => (
                        <motion.div
                            key={match.sys.id}
                            initial="hidden"
                            animate="visible"
                            transition={{ ease: "easeOut", duration: 0.5 }}
                            className={classes.card}>
                            <div className={classes.thumbnail}>

                            {match.fields.free ?          
                            <div className={classes.free_status}>
                                <FaLockOpen />
                            </div>
                            : 
                            <div className={classes.free_status}>
                                <FaLock />
                            </div>}
                                <div className={classes.time}>
                                    <div className={classes.day}>
                                        <strong>
                                            {moment(match.fields.time).format('Do').replace(/[a-z]/g, '')}
                                        </strong>
                                        <span>
                                            {moment(match.fields.time).locale('ar').format('MMM')}
                                        </span>
                                    </div>
                                    <div className={classes.hour}>
                                        {moment(match.fields.time).format('h:mm')}
                                    </div>
                                </div>
                                <img src={`${match.fields?.thumbnail?.fields.file.url.replace('//', 'https://')}`} />
                                </div>
                            <div>
                                <strong className={classes.title}>{match.fields.title}</strong>
                                <div className={classes.logos}>
                                    <img src={`${match.fields?.logo1?.fields.file.url}`} />
                                    <img src={`/vs.png`} />
                                    <img src={`${match.fields?.logo2?.fields.file.url}`} />
                                </div>
                            </div>

                            <div className={classes.bottom_card}>
                                <div className={classes.league_logo}>
                                    <img src={match.fields.league ? `${match.fields?.league.fields.logo.fields.file.url}` : logoLeague} />
                                </div>
                                <Link href={`/live/${match.fields.type}/${match.sys.id}`}>
                                    <a>
                                        <div className={classes.btn_view}>
                                            <strong>مشاهدة</strong>
                                            <FaArrowLeft />
                                        </div>
                                    </a>
                                </Link>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
                }
        </>
    )
}

export default CardMatch;