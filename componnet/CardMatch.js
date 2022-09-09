import classes from '../styles/Card.module.css';
import moment from 'moment/min/moment-with-locales';
import {BsUnlock} from 'react-icons/bs';
import {FaArrowLeft} from 'react-icons/fa';
import {GiAbstract068} from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

function CardMatch({matches, logoLeague}) {
    const isMobScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const isSmallScreen = useMediaQuery({ query: '(max-width: 412px)' });

    return(
        <>
            {isMobScreen ? 
                    <motion.div layout>
                        <Swiper
                        spaceBetween={10}
                        slidesPerView={!isSmallScreen ? 2 : 1}>
                            {matches.map((match) => (
                                <SwiperSlide key={match.id}>
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ ease: "easeOut", duration: 0.5 }}
                                        className={classes.card}>

                                        <div className={classes.thumbnail}>

                                            {match.attributes.free ?          
                                            <div className={classes.free_status}>
                                                <BsUnlock />
                                            </div>
                                            : ''}

                                            <div className={classes.time}>
                                                <div className={classes.day}>
                                                    <strong>
                                                        {moment(match.attributes.time).format('Do').replace(/[a-z]/g, '')}
                                                    </strong>
                                                    <span>
                                                        {moment(match.attributes.time).locale('ar').format('MMM')}
                                                    </span>
                                                </div>
                                                <div className={classes.hour}>
                                                    {moment(match.attributes.time).format('h:mm')}
                                                </div>
                                            </div>
                                            <img src={`${match.attributes?.thumbnail?.data.attributes.formats.small.url}`} />
                                        </div>

                                        <div>
                                            <strong className={classes.title}>{match.attributes.title}</strong>
                                            <div className={classes.logos}>
                                                <img src={`${match.attributes?.logo1?.data.attributes.url}`} />
                                                    <GiAbstract068 />
                                                <img src={`${match.attributes?.logo2?.data.attributes.url}`} />
                                            </div>
                                        </div>
                                        
                                        <div className={classes.bottom_card}>
                                            <div className={classes.league_logo}>
                                            <img src={match.attributes.league ? `${match.attributes?.league.data.attributes.logo.data.attributes.formats.thumbnail.url}` : logoLeague} />
                                            </div>
                                            <Link href={`/live/${match.id}`}>
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
                            key={match.id}
                            initial="hidden"
                            animate="visible"
                            transition={{ ease: "easeOut", duration: 0.5 }}
                            className={classes.card}>
                            <div className={classes.thumbnail}>

                                {match.attributes.free ?          
                                <div className={classes.free_status}>
                                    <BsUnlock />
                                </div>
                                : ''}

                                <div className={classes.time}>
                                    <div className={classes.day}>
                                        <strong>
                                            {moment(match.attributes.time).format('Do').replace(/[a-z]/g, '')}
                                        </strong>
                                        <span>
                                            {moment(match.attributes.time).locale('ar').format('MMM')}
                                        </span>
                                    </div>
                                    <div className={classes.hour}>
                                        {moment(match.attributes.time).format('h:mm')}
                                    </div>
                                </div>
                                <img src={`${match.attributes?.thumbnail?.data.attributes.formats.small.url}`} />
                            </div>
                            <div>
                                <strong className={classes.title}>{match.attributes.title}</strong>
                                <div className={classes.logos}>
                                    <img src={`${match.attributes?.logo1?.data.attributes.url}`} />
                                        <GiAbstract068 />
                                    <img src={`${match.attributes?.logo2?.data.attributes.url}`} />
                                </div>
                            </div>

                            <div className={classes.bottom_card}>
                                <div className={classes.league_logo}>
                                    <img src={match.attributes.league ? `${match.attributes?.league.data.attributes.logo.data.attributes.formats.thumbnail.url}` : logoLeague} />
                                </div>
                                <Link href={`/live/${match.id}`}>
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