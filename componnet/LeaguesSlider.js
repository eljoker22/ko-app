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
import { CostumImage } from './Images';

function LeaguesSlider({leagues}) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 586px)' });
    const isSmallestScreen = useMediaQuery({ query: '(max-width: 450px)' });
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
                slidesPerView={isSmallestScreen ? 2  : isSmallScreen ? 3 : 4}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}>

                    {leagues.map((leag) => (
                        <SwiperSlide key={leag.fields.name}>
                            <Link href={`/league/${leag.fields.name.replaceAll(' ', '-')}`}>
                                <a>
                                    <div className={classes.leag}>
                                        <div className={classes.overlay}>
                                        <img  src={`${leag.fields?.logo?.fields.file.url}`} alt='leag' />
                                        </div>
                                        <CostumImage  
                                            src={`${leag.fields?.thumbnail?.fields.file.url.replace('//', 'https://')}`}
                                        />
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