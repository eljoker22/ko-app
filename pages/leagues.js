import classes from '../styles/Leagues.module.css';
import Link from 'next/link';
import React from 'react'
import { getLeagues } from '../datalayer/contentful/data';
import { CostumImage } from '../componnet/Images';

const leagues = ({leagues}) => {
    console.log(leagues)
  return (
    <div>
        <h2>البطولات والمنافسات</h2>
        <div className={classes.leagues}>
            {leagues?.map((leag) => (
                <Link key={leag.id} href={`/league/${leag.fields.name.replaceAll(' ', '-')}`}>
                <a>
                <div className={classes.leag}>
                        <CostumImage 
                            src={`${leag.fields?.logo?.fields.file.url.replace('//', 'https://')}`}
                        />
                </div>
                </a>
                </Link>
                    
            ))}
        </div>
    </div>
  )
}

export default leagues;

export async function getStaticProps() {
    const reqLeagues= await getLeagues();


    return{
        props: { leagues: reqLeagues}
    }
}