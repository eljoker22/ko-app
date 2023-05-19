import classes from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CostumImage } from './Images';
import { useMediaQuery } from 'react-responsive'

function HeroSection({heroSection}) {
    console.log(heroSection);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const handleTimer = () => {
        const matchDate = new Date(heroSection.fields.date);
        const total = Date.parse(matchDate) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );

        setTimer({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })

    }

    useEffect(() => {
        setInterval(handleTimer, 1000);
    }, []);

    return(
        <div className={classes.hero_section}>
            <div className={classes.big_banner}>
                {/* <CostumImage 
                    src={`${heroSection.fields.thumbnail.fields.file.url.replace('//', 'https://')}`}
                    /> */}
        <div className={classes.Image}>
            <Image 
                src={`${heroSection.fields.thumbnail.fields.file.url.replace('//', 'https://')}`}
                width={0}
                height={0}
                sizes="100vw"
                objectFit='cover'
                style={{ width: '100%', height: '250px' , borderRadius: '15px' }} // optional
                alt={'banner'}
            />
        </div>
                <div className={classes.info}>
                <h2>{heroSection.fields.name}</h2>
                <div className={classes.timer}>
                        <div className={classes.num}>
                            <div>
                                <span>يوم</span>
                                <strong>{timer?.days}</strong>
                            </div>
                        </div>
                        <div className={classes.num}>
                            <div>
                            <span>ساعة</span>
                            <strong>{timer?.hours}</strong>
                            </div>
                        </div>
                        <div className={classes.num}>
                            <div>
                            <span>دقيقة</span>
                            <strong>{timer?.minutes}</strong>
                            </div>
                        </div>
                        <div className={classes.num}>
                            <div>
                            <span>ثانية</span>
                                <strong>{timer?.seconds}</strong>
                            </div>
                        </div>
                </div>
                </div>
                
            </div>

        {!isSmallScreen &&
                    <div className={classes.small_banner}>
                    <div className={classes.Image}>
                        <Image 
                            src={`${heroSection.fields.thumbnail.fields.file.url.replace('//', 'https://')}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            objectFit='cover'
                            style={{ width: '100%', height: 'auto' , borderRadius: '15px' }} // optional
                            alt={'banner'}
                        />
                        </div>
                    </div>}
        </div>
    )
}

export default HeroSection;