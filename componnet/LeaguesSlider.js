import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import classes from '../styles/LeaguesSlider.module.css';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive'
import {FaArrowLeft} from 'react-icons/fa';
import {FaArrowRight} from 'react-icons/fa';
import { useRef, useEffect } from 'react';

function LeaguesSlider({leagues}) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 586px)' });
    const swiper = useSwiper();
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    useEffect(() => {
        console.log('swiper', swiper)
    }, [swiper]) 
    return(
        <div className={classes.leagues_slider}>


            <Swiper 
                modules={[Navigation, EffectFade]}
                spaceBetween={10}
                slidesPerView={isSmallScreen ? 3 : 4}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}>

                    {leagues.map((leag) => (
                        <SwiperSlide key={leag.attributes.name}>
                            <Link href={`/league/${leag.attributes.name.replaceAll(' ', '-')}`}>
                                <a>
                                    <div className={classes.leag}>
                                        <div className={classes.overlay}>
                                        <img  src={`${leag.attributes?.logo?.data.attributes.url}`} />
                                        </div>
                                        <img  src={`${leag.attributes?.thumbnail?.data.attributes.url}`} />
                                    </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    )
}

export default LeaguesSlider;