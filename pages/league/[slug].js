import classes from '../../styles/League.module.css';
import styles from '../../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../../componnet/Buttons';
import CardMatch from '../../componnet/CardMatch';


function League({league, matches}) {
    console.log(league);
    console.log(matches);
    const leag = league?.data[0].attributes;
    const matchesL = matches?.data[0].attributes.matches?.data;
    return(
        <div>
            <div className={classes.banners}>
                <div className={classes.cover}>
                    <img src={`https://strapi-122894-0.cloudclusters.net${leag.cover?.data.attributes.url}`} />
                </div>
                <div className={classes.banner}>
                    <img src={`https://strapi-122894-0.cloudclusters.net${leag.logo?.data.attributes.url}`} />
                    <strong>{leag.name}</strong>
                    <div className={classes.match}>
                        <div className={classes.team}>
                            <img src={`https://strapi-122894-0.cloudclusters.net${matchesL[0]?.attributes.logo1?.data.attributes.url}`} />
                            <strong>{matchesL[0]?.attributes.team1}</strong>
                        </div>
                        <div className={classes.time}>
                            {moment(matchesL[0]?.attributes.time).format('h:mm')}
                        </div>
                        <div className={classes.team}>
                            <img src={`https://strapi-122894-0.cloudclusters.net${matchesL[0]?.attributes.logo2?.data.attributes.url}`} />
                            <strong>{matchesL[0]?.attributes.team2}</strong>
                        </div>
                    </div>
                    <ButtonFullWidth>
                        مشاهدة
                    </ButtonFullWidth>
                </div>
            </div>
                <h2 className={styles.section_title}>المباريات</h2>
                <CardMatch matches={matchesL} logoLeague={`https://strapi-122894-0.cloudclusters.net${leag.logo?.data.attributes.url}`} />
        </div>
    )
}

export default League;

export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/leagues`);
    const leagues = await res.json();
    const paths = leagues.data.map((leag) => ({
        params: {slug: leag.attributes.name.split(' ').join('-').toString()},
    }))

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug.split('-').join(' ');
    const res = await fetch(`${process.env.API_URL}/leagues?populate=logo,cover,thumbnail&filters[name][$eq]=${slug}`);
    const resMatches = await fetch(`${process.env.API_URL}/leagues?populate[matches][populate]=logo1,logo2,thumbnail&filters[name][$eq]=${slug}`);
    const league = await res.json();
    const matches = await resMatches.json();
    return{
        props: {league: league, matches: matches}
    }
}