import classes from '../../styles/Match.module.css';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import qualitySelector from "videojs-hls-quality-selector";
import _ from "videojs-contrib-quality-levels";
import ChatMatch from '../../componnet/ChatMatch';
import moment from 'moment';
export async function getServerSideProps() {
    
    const res = await fetch(`${process.env.API_URL}/matches/4?populate=thumbnail,logo1,logo2`);
    const match = await res.json();

    return{
        props: {match}
    }
}

function Match(match) {
    console.log(match.match);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [playerLive, setPlayerLive] = useState(undefined);
    const [timer, setTimer] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);

    const matchData = match?.match?.data?.attributes;
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

    return(
        <div className={classes.match}>
            <div className={classes.video_side}>
                <div className={classes.video_player}>
                    <video poster={`http://localhost:1337${matchData.thumbnail.data.attributes.url}`} ref={videoRef} className="video-js vjs-matrix vjs-big-play-centered" />
                </div>
                <div className={classes.info_match}>
                    <div className={classes.team}>
                            <img src={`http://localhost:1337${matchData.logo1.data.attributes.url}`} />
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
                        <img src={`http://localhost:1337${matchData.logo2.data.attributes.url}`} />
                        <strong>{matchData.team2}</strong>
                    </div>
                </div>
            </div>
            <ChatMatch match={match?.match?.data} />
        </div>
    )
}

export default Match;