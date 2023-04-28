import classes from '../styles/League.module.css';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../componnet/Buttons';
import SliderMatches from '../componnet/SliderMatches';
import { getUfcMatches, getUfcPage } from '../datalayer/contentful/data';


function UfcPage({page, matches}) {
    console.log(page);
    console.log(matches);
    const ufc = page?.fields;
    
    return(
        <div>
            <div className={classes.banners}>
                <div className={`${classes.cover} ${classes.fight}`}>
                    <img src={`${ufc.thumbnail?.fields.file.url}`} />
                </div>
            </div>

                <h2 className={styles.section_title}>المباريات ufc مسجلة</h2>
                <SliderMatches matches={matches} />
        </div>
    )
}

export default UfcPage;


export async function getStaticProps() {
    const reqUfc = await getUfcMatches();
    const reqUfcPage = await getUfcPage();

    return{
        props: {page: reqUfcPage, matches: reqUfc}
    }
}