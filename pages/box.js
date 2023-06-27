import classes from '../styles/League.module.css';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import { Button, ButtonFullWidth } from '../componnet/Buttons';
import SliderMatches from '../componnet/SliderMatches';
import { getBoxMatch, getBoxMatches, getBoxPage } from '../datalayer/contentful/data';
import {CostumImage} from '../componnet/Images';

function UfcPage({page, matches}) {
    console.log(page);
    console.log(matches);
    const box = page?.fields;
    
    return(
        <div>
            <div className={classes.banners}>
                <div className={`${classes.cover} ${classes.fight}`}>
                    <CostumImage 
                            src={`${box.thumbnail?.fields.file.url.replace('//', 'https://')}`}
                        />
                </div>
            </div>

                <h2 className={styles.section_title}>المباريات ملاكمة مسجلة</h2>
                <SliderMatches matches={matches} />
        </div>
    )
}

export default UfcPage;


export async function getStaticProps() {
    const reqBox = await getBoxMatches();
    const reqBoxPage = await getBoxPage();

    return{
        props: {page: reqBoxPage, matches: reqBox}
    }
}