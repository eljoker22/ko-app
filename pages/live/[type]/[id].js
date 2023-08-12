import classes from '../../../styles/Match.module.css';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/fantasy/index.css';
import '@videojs/themes/dist/forest/index.css';
import '@videojs/themes/dist/city/index.css';

import qualitySelector from "videojs-hls-quality-selector";
import _ from "videojs-contrib-quality-levels";
import ChatMatch from '../../../componnet/ChatMatch';
import moment from 'moment';
import nookies from 'nookies';
import {Button} from '../../../componnet/Buttons';
import {GiAbstract068} from 'react-icons/gi';
import { useSelector } from 'react-redux';
import {useMediaQuery} from 'react-responsive';
import { getAds, getBoxMatch, getMatch, getUfcMatch } from '../../../datalayer/contentful/data';

export async function getServerSideProps(ctx) {
    const { type, id } = ctx.query;
    const token = nookies.get(ctx);

    if (!token.jwt) {
        return{
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    // get url with dynamic content
    // const urlReq = type === 'football-live' ?  
    // `${process.env.API_URL}/matches/${id}?populate=thumbnail,logo1,logo2&populate=league.logo`
    // : type === 'box-video' ?
    // `${process.env.API_URL}/box-matches/${id}?populate=thumbnail`
    // : type === 'ufc-video' ?
    // `${process.env.API_URL}/ufc-matches/${id}?populate=thumbnail`
    // :
    // '';

    const match = type === 'football-live' ? await getMatch(id) : type === 'box-video' ? await getBoxMatch(id) : await getUfcMatch(id);

        
        // get user data
            const resUser = await fetch(`${process.env.nodeAppApi}/v1/auth/user`, {
                method: 'get',
                headers: {
                    "x-access-token": `${token?.jwt}`
                }
            }) 
            const userData = await resUser.json();
    
    
    
        if (userData.error || !userData.user) {
            return{
                redirect: {
                    destination: '/login',
                    permanent: false,
                }
            }
        }
        
        let notAllow = false;
        let adsAllow = false;

    const { user } = userData;

    const today = new Date().getTime();
    const renewTime = new Date(user.subscriptionEndDate).getTime();

    if (!match?.fields.free && user.plan === 'free') { // if match not free check access user allow or not
        notAllow = true;
    }else if (user.plan !== 'free' && today > renewTime ) {
        notAllow = true;
    }

        if (match.fields.free && user.plan === 'free') {
            adsAllow = true;
        }
            
        // get ads data
        const resAds = await getAds();


    return{
        props: {match, ads: resAds, notAllow: notAllow, adsAllow: adsAllow,type: type}
    }
}


function Match({match, notAllow, type, ads, adsAllow}) {
    //const u = useSelector(state => state.user);

    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [playerLive, setPlayerLive] = useState(undefined);
    const [timer, setTimer] = useState(null);
    const [matchStatus, setMatchStatus] = useState('wait');
    const smallScreen = useMediaQuery({ query: '(max-width: 480px)' });
    const [showAd, setShowAd] = useState(false);
    const [ad, setAd] = useState('');
    const matchData = match.fields;
    const contentUrl = notAllow ? '' : match?.fields?.url;
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
        src: contentUrl, 
        type: "application/x-mpegURL",
        withCredentials: false
        },
    ],
    html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true
    },
    chromecast:{
        appId:'APP-ID'
    }
    };
    useEffect(() => {
        if (!playerRef.current) {
            
        const player = playerRef.current = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
        // console.log('onPlayerReady');
        });

        setPlayerLive(player)
        player.src({ src: contentUrl, type: type === 'football-live' ? "application/x-mpegURL" : "video/mp4" });
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
    // ads handler
    const showAds = () =>{

        if (showAd === false) {
            const max = ads?.length; 
            const randomAdsIndex = Math.floor(Math.random() * (max - 0))
            console.log(randomAdsIndex);
            setAd(ads[randomAdsIndex].fields.video);
            setShowAd(true);
            playerRef.current.exitFullscreen()
            playerRef.current.volume(0.0);
            setTimeout(() => {
                setShowAd(false)
                playerRef.current.volume(0.9);
            }, 25000);
        }
    }

    useEffect(() => {
        setInterval(updateClock, 1000);
        adsAllow && setInterval(showAds, 60000);

    }, [])

    console.log(ads);

    
    return(
        <div className={classes.match}>

            <div className={classes.video_side}>
                <div className={classes.video_player}>

                    <video poster={`${matchData?.thumbnail.fields.file.url}`} ref={videoRef} className="video-js vjs-theme-fantasy vjs-matrix vjs-big-play-centered" />
                    {showAd && 
                        <div className={classes.ads}>
                        <div className={classes.ad}>
                            <video className={classes.vid}  autoplay="autoplay">
                                <source src={ad} type="video/mp4" />
                            </video>
                        </div>
                            <div className={classes.progressBar}>
                                
                            </div>
                        </div>}
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
                        </div>
                        }
                </div>
                {!smallScreen ? 
                    <div className={classes.cont_info}>
                        {type === 'football-live' ?
                        <div className={classes.league}>
                            <img src={`${matchData.league.fields.logo.fields.file.url}`} />
                            <strong>
                                {matchData.league.fields.name}
                            </strong>
                        </div>
                        :''}
                        <div className={classes.info_match}>
                            <div className={classes.team}>
                                {type === 'football-live' ? <img src={`${matchData.logo1.fields.file.url}`} /> : ''}
                                <strong>{type === 'football-live' ?  matchData.team1 : matchData?.fighter1}</strong>
                            </div>
                                {type === 'football-live' ? 
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
                                :
                                    <img src='/vs.png' />
                                }
                            <div className={classes.team}>
                            {type === 'football-live' ? <img src={`${matchData.logo2.fields.file.url}`} /> : ''}
                                <strong>{type === 'football-live' ?  matchData.team2 : matchData?.fighter2}</strong>
                            </div>
                        </div>
                    </div>
                    : 
                    <div className={classes.cont_info}> 
                        <div className={classes.league}>
                            <img src={`${matchData.league.fields.logo.fields.file.url}`} />
                            <strong>{matchData.league.fields.name}</strong>
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
                                        <img src={`${matchData.logo1.fields.file.url}`} />
                                        <strong>{matchData.team1}</strong>
                                </div>
                                <div>
                                    <GiAbstract068 />
                                </div>
                                <div className={classes.team}>
                                    <img src={`${matchData.logo2.fields.file.url}`} />
                                    <strong>{matchData.team2}</strong>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    }
            </div>
            <ChatMatch match={match} />
        </div>
    )
}

export default Match;