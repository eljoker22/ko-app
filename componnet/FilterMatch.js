import classes from '../styles/Filter.module.css';
import { useRef, useState, useEffect } from 'react';
import moment from 'moment';

function FilterMatch({matches, setMatchesFiltered}) {
    const ref = useRef(null);
    const firstItem = useRef(null);

    useEffect(() => {
        ref.current.style.left = `${firstItem.current.offsetLeft}px`;
        ref.current.style.width = `${firstItem.current.offsetWidth}px`;
    }, [])
    const handleMenu = (e, type) => {
        console.log(e.target.offsetLeft);
        ref.current.style.left = `${e.target.offsetLeft}px`;
        ref.current.style.width = `${e.target.offsetWidth}px`;
        // filter matches
        console.log(matches, type)
        const dateToday = new Date();
        const matchDate = new Date('2022-04-04T19:00:00.000Z');
        console.log(moment(dateToday).format('l'), moment('2022-04-04T19:00:00.000Z').format('l'));
        if (type === 'all') {
            setMatchesFiltered(matches);
        }else if (type === 'today') {
            // filter matches to today matches
            const matchesToday = matches.filter(match => moment(match.fields.time).format('l') === moment(dateToday).format('l'));
            setMatchesFiltered(matchesToday);

        }else if (type === 'tom') {
            // filter matches to tomorw matches
            const nextDay = dateToday.getDate()+1; // get next day
            const arrTomorwDate = moment(dateToday).format('l').split('/'); 
            arrTomorwDate.splice(1, 1, nextDay.toString()); // replace today day with tomorw day
            const tomorwDate = arrTomorwDate.join('/');
            console.log(tomorwDate);
            const matchesTomorw = matches.filter(match => moment(match.fields.time).format('l') === tomorwDate);
            setMatchesFiltered(matchesTomorw);

        }else if (type === 'free') {
            const freeMatches = matches.filter(match => match.fields.free === true);
            setMatchesFiltered(freeMatches);
        }
    }
    return(
        <div className={classes.filter_cont}>
            <div className={classes.filter}>
                <span ref={ref} className={classes.marker}></span>
                <div ref={firstItem} onClick={(e) => handleMenu(e, 'all')}>
                    كل المباريات
                </div>
                <div onClick={(e) => handleMenu(e, 'today')}>
                    مباريات اليوم
                </div>
                <div onClick={(e) => handleMenu(e, 'tom')}>
                    مباريات الغد
                </div>
                <div onClick={(e) => handleMenu(e, 'free')}>
                    مباريات مجانية
                </div>
            </div>
        </div>
    )
}

export default FilterMatch;