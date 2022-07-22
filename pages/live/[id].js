import classes from '../../styles/Match.module.css';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import qualitySelector from "videojs-hls-quality-selector";
import _ from "videojs-contrib-quality-levels";
import ChatMatch from '../../componnet/ChatMatch';
import moment from 'moment';
import nookies from 'nookies';
import {Button} from '../../componnet/Buttons';
import {GiAbstract068} from 'react-icons/gi';
import { useSelector } from 'react-redux';
import {useMediaQuery} from 'react-responsive';

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    const token = nookies.get(ctx).jwt;
    const res = await fetch(`${process.env.API_URL}/matches/${id}?populate=thumbnail,logo1,logo2&populate=league.logo`);
    const match = await res.json();
    const resUser = await fetch(`${process.env.API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const user = await resUser.json();
    let notAllow = false;

    if (user.error) {
        return{
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    if (!match.data?.attributes.free) { // if match not free check access user allow or not

            if (user?.plan == 'free') { // if user plan free not Allow to access
                notAllow = true;
            }else if (user?.plan !== 'free' && user.payment_method === 'paypal') { // if user plan premium && payment method paypal
                const clintIdAndSecret = btoa('AQFiIarA9Ec2ZegTb-o7CKmDJ6nL3Paw-zfOXbX7aSp9lqnIU8NiNNze1JOm-L5v0RyZ8_X_dRgwzf8f:ENzwbhiH3RdDUVzSKeyK_RV9HPZqn2_4yfa4hWIUmshVjYI9pne_WpaoUqcCU1zOHPMWtxkzvZWp9QAa');
                const resPaypal = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.subscriptionId}`, {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Basic ${clintIdAndSecret}`
                    }
                })
                const resultPaypal = await resPaypal.json();
                if (resultPaypal?.status !== 'ACTIVE') { // if subscription status not Active
                    notAllow = true;
                }
            }
        }

    return{
        props: {match, notAllow: notAllow}
    }
}


function Match({match, notAllow}) {
    const u = useSelector(state => state.user);
    
    console.log('user', u);

    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [playerLive, setPlayerLive] = useState(undefined);
    const [timer, setTimer] = useState(null);
    const [matchStatus, setMatchStatus] = useState('wait');
    const smallScreen = useMediaQuery({ query: '(max-width: 480px)' });

    const matchData = match?.data?.attributes;
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        height: 550,
        width: 900,
        fluid: true,
        responsive: true,
        preload: 'metadata',
        sources: [
        {
        src: matchData?.channel,
        type: "application/x-mpegURL",
        withCredentials: false
        },
    ],
    html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true
    }
    };

    useEffect(() => {
        if (!playerRef.current) {
        const player = playerRef.current = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
        // console.log('onPlayerReady');
        });

        setPlayerLive(player)
    }
    }, [match])

    useEffect(() => {
    return () => {
        if (playerLive) {
        playerLive.dispose();
        playerRef.current = null;
        }
    };
    }, [match])

    useEffect(() => {
        if (playerLive) {
            playerLive.hlsQualitySelector({ displayCurrentQuality: true });
            }
    }, [playerLive]);


    const updateClock = () => {
        const dateMAtch = new Date(matchData.time);
        const total = Date.parse(dateMAtch) - Date.parse(new Date());
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

        const endMatchTime = Date.parse(dateMAtch) + 2 * 60 * 60 * 1000; // end match time

        if (Date.parse(new Date()) > Date.parse(dateMAtch) &&  Date.parse(new Date()) < endMatchTime) {
            setMatchStatus('now');
        }else if (Date.parse(new Date()) > endMatchTime) {
            setMatchStatus('end');
        }
    }

    useEffect(() => {
        setInterval(updateClock, 1000);
    }, [])

    console.log(match);
    
    return(
        <div className={classes.match}>
            <div className={classes.video_side}>
                <div className={classes.video_player}>
                    <video poster={`${matchData.thumbnail.data.attributes.url}`} ref={videoRef} className="video-js vjs-matrix vjs-big-play-centered" />
                    {notAllow && 
                        <div className={classes.banner_not_allow}>
                            <div>
                            <h1>المباراة ليست مجانية يجب ترقية خطتك</h1>
                            <Link href="/subscription">
                                <a>
                                    <Button type="button">
                                    ترقية خطتك
                                    </Button>
                                </a>
                            </Link>
                            </div>
                        </div>}
                </div>
                {!smallScreen ? 
                    <div className={classes.cont_info}>
                        <div className={classes.league}>
                            <img src={`${match.data.attributes.league.data.attributes.logo.data.attributes.formats.thumbnail.url}`} />
                            <strong>{match.data.attributes.league.data.attributes.name}</strong>
                        </div>
                        <div className={classes.info_match}>
                            <div className={classes.team}>
                                    <img src={`${matchData.logo1.data.attributes.url}`} />
                                    <strong>{matchData.team1}</strong>
                            </div>
                            <div className={classes.timer_cont}>
                                <div className={classes.timer_border}>
                                    <p className={classes.timer_head}>{moment(matchData?.date).format('l')} {moment(matchData?.date).format('LT')}</p>
                                    <div className={classes.timer}>
                                        {matchStatus === 'wait' ? 
                                        <>
                                            <div className={classes.num}>
                                            <span>يوم</span>
                                            <strong>{timer?.days}</strong>
                                            </div>
                                            <div className={classes.num}>
                                                <span>ساعة</span>
                                                <strong>{timer?.hours}</strong>
                                            </div>
                                            <div className={classes.num}>
                                                <span>دقيقة</span>
                                                <strong>{timer?.minutes}</strong>
                                            </div>
                                            <div className={classes.num}>
                                                <span>ثانية</span>
                                                <strong>{timer?.seconds}</strong>
                                            </div>
                                        </>
                                        : 
                                            <strong>{matchStatus === 'now' ? 'مباشر' : 'انتهت'}</strong>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.team}>
                                <img src={`${matchData.logo2.data.attributes.url}`} />
                                <strong>{matchData.team2}</strong>
                            </div>
                        </div>
                    </div>
                    : 
                    <div className={classes.cont_info}> 
                        <div className={classes.league}>
                            <img src={`${match.data.attributes.league.data.attributes.logo.data.attributes.formats.thumbnail.url}`} />
                            <strong>{match.data.attributes.league.data.attributes.name}</strong>
                        </div>
                        <div className={classes.info_match}>
                            <div className={classes.timer_cont}>
                            <div className={classes.timer_border}>
                                <p className={classes.timer_head}>{moment(matchData?.date).format('l')} {moment(matchData?.date).format('LT')}</p>
                                <div className={classes.timer}>
                                    {matchStatus === 'wait' ? 
                                    <>
                                        <div className={classes.num}>
                                        <span>يوم</span>
                                        <strong>{timer?.days}</strong>
                                        </div>
                                        <div className={classes.num}>
                                            <span>ساعة</span>
                                            <strong>{timer?.hours}</strong>
                                        </div>
                                        <div className={classes.num}>
                                            <span>دقيقة</span>
                                            <strong>{timer?.minutes}</strong>
                                        </div>
                                        <div className={classes.num}>
                                            <span>ثانية</span>
                                            <strong>{timer?.seconds}</strong>
                                        </div>
                                    </>
                                    : 
                                        <strong>{matchStatus === 'now' ? 'مباشر' : 'انتهت'}</strong>
                                    }
                                </div>
                            </div>
                        </div>
                            <div className={classes.cont_team}>
                                <div className={classes.team}>
                                        <img src={`${matchData.logo1.data.attributes.url}`} />
                                        <strong>{matchData.team1}</strong>
                                </div>
                                <div>
                                    <GiAbstract068 />
                                </div>
                                <div className={classes.team}>
                                    <img src={`${matchData.logo2.data.attributes.url}`} />
                                    <strong>{matchData.team2}</strong>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    }
            </div>
            <ChatMatch match={match?.data} />
        </div>
    )
}

export default Match;