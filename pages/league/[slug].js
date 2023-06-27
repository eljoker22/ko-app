import classes from '../../styles/League.module.css';
import styles from '../../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../../componnet/Buttons';
import CardMatch from '../../componnet/CardMatch';
import { getLeague, getLeagues, getMatch, getMatches } from '../../datalayer/contentful/data';
import Image from "next/image";


function League({league, matches}) {
    console.log(league);
    console.log(matches);
    const leag = league[0]?.fields;
    const matchesL = matches;
    return(
        <div>
            <div className={classes.banners}>
                
                <div className={classes.cover}>
                    <Image  
                        src={`${leag.cover.fields.file.url.replace('//', 'https://')}`}
                        layout='fill'
                        objectFit='cover'    
                    />
                </div>

                <div className={classes.banner}>
                    <img src={`${leag.logo?.fields.file.url}`} />
                    <strong>{leag.name}</strong>

                    <div className={classes.match}>
                        <div className={classes.team}>
                            <img src={`${matchesL[0]?.fields.logo1?.fields.file.url}`} />
                            <strong>{matchesL[0]?.fields.team1}</strong>
                        </div>
                        <div className={classes.time}>
                            {moment(matchesL[0]?.fields.time).format('h:mm')}
                        </div>
                        <div className={classes.team}>
                            <img src={`${matchesL[0]?.fields.logo2?.fields.file.url}`} />
                            <strong>{matchesL[0]?.fields.team2}</strong>
                        </div>
                    </div>

                    <ButtonFullWidth>
                        مشاهدة
                    </ButtonFullWidth>
                </div>
                
                </div>
                <h2 className={styles.section_title}>المباريات</h2>
                
                    <CardMatch matches={matchesL} logoLeague={`${leag.logo?.fields.file.url}`} />
        </div>
    )
}

export default League;

export async function getStaticPaths() {
    const leagues = await getLeagues();
    const paths = leagues.map((leag) => ({
        params: {slug: leag.fields.name.split(' ').join('-').toString()},
    }))

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug.split('-').join(' ');
    const league = await getLeague(slug);
    const allMatches = await getMatches();
    const matches = allMatches.filter((match) => match.fields.league.fields.name == slug);
    return{
        props: {league: league, matches: matches}
    }
}