import classes from '../styles/League.module.css';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../componnet/Buttons';
import SliderMatches from '../componnet/SliderMatches';


function UfcPage({page, matches}) {
    console.log(page);
    console.log(matches);
    const ufc = page?.attributes;
    
    return(
        <div>
            <div className={classes.banners}>
                <div className={`${classes.cover} ${classes.fight}`}>
                    <img src={`https://strapi-122894-0.cloudclusters.net${ufc.thumbnail?.data.attributes.url}`} />
                </div>
            </div>

                <h2 className={styles.section_title}>المباريات ufc مسجلة</h2>
                <SliderMatches matches={matches} />
        </div>
    )
}

export default UfcPage;


export async function getStaticProps() {
    const resUfc = await fetch(`${process.env.API_URL}/ufc-matches?populate=thumbnail`);
    const reqUfc = await resUfc.json();
    const resUfcPage = await fetch(`${process.env.API_URL}/ufc-page?populate=thumbnail`)
    const reqUfcPage = await resUfcPage.json();

    return{
        props: {page: reqUfcPage?.data, matches: reqUfc?.data}
    }
}