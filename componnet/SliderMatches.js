import classes from '../styles/SliderMatch.module.css';
import styles from '../styles/Home.module.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import playIcon from '../assest/play.png';
import {AiOutlineUnlock} from 'react-icons/ai';
import Link from 'next/link';
import { useRef } from 'react';


function SliderMatches({matches}) {
    const swiper = useSwiper();
    const nextRefM = useRef(null);
    const prevRefM = useRef(null);
    return(
        <div>
            <Swiper 
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                >
                    {matches.map((match) => (
                        <SwiperSlide key={match.id} className={classes.swiperSlide}>
                            <Link href={`/live/${match.id}`}>
                                <a>
                                <div className={classes.match}>
                                    <div className={classes.overlay}>
                                    </div>
                                    <div className={classes.free}>
                                        <AiOutlineUnlock />
                                    </div>
                                    <img className={classes.icon} src={playIcon.src} />
                                    <img className={classes.thumbnail} src={`http://localhost:1337${match.attributes?.thumbnail?.data.attributes.url}`} />
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