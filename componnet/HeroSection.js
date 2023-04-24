import classes from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
function HeroSection({heroSection}) {
    console.log(heroSection);
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const handleTimer = () => {
        const matchDate = new Date(heroSection.data.attributes.match.data.attributes.time);
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
                <img src={`https://strapi-122894-0.cloudclusters.net${heroSection.data.attributes.bigBanner.data.attributes.url}`} />
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

            <div className={classes.small_banner}>
            <img src={`https://strapi-122894-0.cloudclusters.net${heroSection.data.attributes.smallBanner.data.attributes.url}`} />
            </div>
        </div>
    )
}

export default HeroSection;