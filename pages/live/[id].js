import classes from '../../styles/Match.module.css';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import qualitySelector from "videojs-hls-quality-selector";
import _ from "videojs-contrib-quality-levels";
import ChatMatch from '../../componnet/ChatMatch';

export async function getServerSideProps() {
    
    const res = await fetch(`${process.env.API_URL}/matches/1?populate=thumbnail,logo1,logo2`);
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

    return(
        <div className={classes.match}>
            <div style={{width:'75%'}}>
                
                    <video poster={`http://localhost:1337${matchData?.thumbnail.data.attributes.url}`} ref={videoRef} className="video-js vjs-matrix vjs-big-play-centered" />
                
            </div>
            <ChatMatch />
        </div>
    )
}

export default Match;