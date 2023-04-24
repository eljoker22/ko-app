import classes from '../styles/League.module.css';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../componnet/Buttons';
import SliderMatches from '../componnet/SliderMatches';


function UfcPage({page, matches}) {
    console.log(page);
    console.log(matches);
    const box = page?.attributes;
    
    return(
        <div>
            <div className={classes.banners}>
                <div className={`${classes.cover} ${classes.fight}`}>
                    <img src={`https://strapi-122894-0.cloudclusters.net${box.thumbnail?.data.attributes.url}`} />
                </div>
            </div>

                <h2 className={styles.section_title}>المباريات ملاكمة مسجلة</h2>
                <SliderMatches matches={matches} />
        </div>
    )
}

export default UfcPage;


export async function getStaticProps() {
    const resBox = await fetch(`${process.env.API_URL}/box-matches?populate=thumbnail`);
    const reqBox = await resBox.json();
    const resBoxPage = await fetch(`${process.env.API_URL}/box-page?populate=thumbnail`)
    const reqBoxPage = await resBoxPage.json();

    return{
        props: {page: reqBoxPage?.data, matches: reqBox?.data}
    }
}