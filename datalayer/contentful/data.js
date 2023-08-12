import {createClient} from 'contentful';


const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID, // ID of a Compose-compatible space to be used \
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getMatches = async () => {
    const res = await client.getEntries({content_type: 'matches'});
    const matches = res.items;

    return matches;
}

export const getFreeMatches = async () => {
    const res = await client.getEntries({
        content_type: 'matches',
        'fields.free': true
    });
    const matches = res.items;

    return matches;
}

export const getLeagues = async () => {
    const res = await client.getEntries({
        content_type: 'leagues',
    });
    const leagues = res.items;

    return leagues;
}

export const getLeague = async (nameLeag) => {
    const res = await client.getEntries({
        content_type: 'leagues',
        'fields.name': nameLeag
    });
    const league = res.items;

    return league;
}

export const getBoxMatches = async () => {
    const res = await client.getEntries({
        content_type: 'boxMatch',
    });
    const matches = res.items;

    return matches;
}
export const getUfcMatches = async () => {
    const res = await client.getEntries({
        content_type: 'ufcMatch',
    });
    const matches = res.items;

    return matches;
}

export const getMatch = async (id) => {
    const res = await client.getEntry(id);
    const match = res;

    return match;
}

export const getBoxMatch = async (id) => {
    const res = await client.getEntry(id);
    const match = res;

    return match;
}

export const getUfcMatch = async (id) => {
    const res = await client.getEntry(id);
    const match = res;

    return match;
}
export const getBoxPage = async () => {
    const res = await client.getEntry('CdG1rF2n2OR3BvUFY2GPT');
    const pageBox = res;

    return pageBox;
}
export const getUfcPage = async () => {
    const res = await client.getEntry('11MsYjO10lZXtAxFNNnEWe');
    const pageUfc = res;

    return pageUfc;
}


export const getPlans = async () => {
    const res = await client.getEntries({
        content_type: 'plans',
    });
    const plans = res.items;

    return plans;
}

export const getPlan = async (period) => {
    const res = await client.getEntries({
        content_type: 'plans',
        'fields.period': period
    });
    const plan = res.items;

    return plan;
}

export const getEvents = async () => {
    const res = await client.getEntries({
        content_type: 'events',
    });
    const events = res.items;

    return events;
}

export const getAds = async () => {
    const res = await client.getEntries({
        content_type: 'ads',
    });
    const ads = res.items;

    return ads;
}