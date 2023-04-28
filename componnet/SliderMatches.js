import classes from '../styles/SliderMatch.module.css';
import styles from '../styles/Home.module.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import playIcon from '../assest/play.png';
import {FaLockOpen} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';
import Link from 'next/link';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';


function SliderMatches({matches}) {
    const smallScreen = useMediaQuery({ query:  '(max-width: 450px)'});
    return(
        <div>
            <Swiper 
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={!smallScreen ? 3 : 1}
                navigation
                >
                    {matches.map((match) => (
                        <SwiperSlide key={match.sys.id} className={classes.swiperSlide}>
                            <Link href={`/live/${match.fields.type}/${match.sys.id}`}>
                                <a>
                                <div className={classes.match}>
                                    <div className={classes.overlay}>
                                    </div>
                                    {match.fields.free ? 
                                    <div className={classes.free}>
                                        <FaLockOpen />
                                    </div>
                                    :
                                    <div className={classes.free}>
                                        <FaLock />
                                    </div>}
                                    <img className={classes.icon} src={playIcon.src} />
                                    <img className={classes.thumbnail} src={`${match.fields?.thumbnail?.fields.file.url}`} />
                                </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}

export default SliderMatches; 