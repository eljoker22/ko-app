import Head from 'next/head'
import Image from 'next/image'
import classes from '../styles/Home.module.css'
import HeroSection from '../componnet/HeroSection'
import CardMatch from '../componnet/CardMatch'
import LeaguesSlider from '../componnet/LeaguesSlider'
import SliderMatches from '../componnet/SliderMatches'
import FilterMatch from '../componnet/FilterMatch'
import { useState } from 'react'
import { getMatches, getFreeMatches, getLeagues, getBoxMatches, getUfcMatches, getEvents } from '../datalayer/contentful/data' 

export default function Home({matches, freeMatches, leagues, heroSection, boxMatches, ufcMatches}) {
  console.log(matches)
  console.log(leagues)
  const [matchesFiltered, setMatchesFiltered] = useState(matches);

  return (
    <div>
        <HeroSection heroSection={heroSection[0]} />
        <h2 className={classes.section_title}>المباريات</h2>
          <FilterMatch matches={matches} setMatchesFiltered={setMatchesFiltered} />
          <CardMatch matches={matchesFiltered} />
        <h2 className={classes.section_title}>البطولات</h2>
        <LeaguesSlider leagues={leagues} />
        <h2 className={classes.section_title}>المباريات المجانية</h2>
        <SliderMatches matches={freeMatches} />
        <h2 className={classes.section_title}>المباريات المجانية</h2>
        <SliderMatches matches={boxMatches} />
        <h2 className={classes.section_title}>المباريات المجانية</h2>
        <SliderMatches matches={ufcMatches} />
    </div>
  )
}

export async function getStaticProps() {
  // const res = await fetch(`${process.env.API_URL}/matches?populate=thumbnail,logo1,logo2&populate=league.logo&sort=time%3Aasc`);
  // const matches = await res.json();
  // const resFree = await fetch(`${process.env.API_URL}/matches?populate=thumbnail,logo1,logo2&sort=time%3Aasc&filters[free][$eq]=true`);
  // const freeMatches = await resFree.json();
  // const resLeg = await fetch(`${process.env.API_URL}/leagues?populate=thumbnail,logo`);
  // const leagues = await resLeg.json();
  // const resHero = await fetch(`${process.env.API_URL}/hero-section?populate=bigBanner,smallBanner,match`);
  // const heroSection = await resHero.json();
  //const resBox = await fetch(`${process.env.API_URL}/box-matches?populate=thumbnail`);
  //const reqBox = await resBox.json();
  //const resUfc = await fetch(`${process.env.API_URL}/ufc-matches?populate=thumbnail`);
  //const reqUfc = await resUfc.json();

  const matches = await getMatches();
  const freeMatches = await getFreeMatches();
  const leagues = await getLeagues();
  const boxMatches = await getBoxMatches();
  const ufcMatches = await getUfcMatches();
  const events = await getEvents();
  return{
    props: {matches: matches, freeMatches: freeMatches, leagues: leagues, heroSection: events, boxMatches: boxMatches, ufcMatches: ufcMatches}
  }
}
