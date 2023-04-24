import classes from '../styles/leagues.module.css';
import Link from 'next/link';
import React from 'react'

const leagues = ({leagues}) => {
    console.log(leagues)
  return (
    <div>
        <h2>البطولات والمنافسات</h2>
        <div className={classes.leagues}>
            {leagues?.map((leag) => (
                <Link key={leag.id} href={`/league/${leag.attributes.name.replaceAll(' ', '-')}`}>
                <a>
                    <div className={classes.leag}>
                        <img src={`https://strapi-122894-0.cloudclusters.net${leag.attributes?.logo?.data.attributes.url}`} />
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
    const resLeagues = await fetch(`${process.env.API_URL}/leagues?populate=logo`);
    const reqLeagues= await resLeagues.json();


    return{
        props: { leagues: reqLeagues?.data}
    }
}