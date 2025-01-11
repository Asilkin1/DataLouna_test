import fetch from 'node-fetch';
import redis_client from '../utils/redis';

//  Skinport API
const SKINPORT_URL = 'https://api.skinport.com/v1/items';


const fetchSkinportData = async(): Promise<any[]> => {
    const url = `${SKINPORT_URL}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to fetch Skinport data: ${response.statusText}`);
    }
    return response.json();
};

const processSkinportData = (items: any[]): any[] => {
    return items.map((item) => ({
        name: item.name,
        tradable_price: item.tradable ? item.tradable.price : null,
        non_tradable_price: item.non_tradable ? item.non_tradable.price : null
    }));
};

export const getSkinportItems = async (): Promise<any[]> => {
    const cacheKey = 'skinport';
    const cachedData = await redis_client.get(cacheKey);

    if (cachedData){
        console.log('Cache hit');
        return JSON.parse(cachedData);
    }
    const rawData = await fetchSkinportData();
    const processedData = processSkinportData(rawData);

    await redis_client.set(cacheKey, JSON.stringify(processedData));
    return processedData;
}
