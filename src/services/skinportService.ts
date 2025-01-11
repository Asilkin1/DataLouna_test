import fetch from 'node-fetch';
import redis_client from '../utils/redis';

const fetchSkinportData = async(): Promise<any[]> => {
    const url = 'https://api.skinport.com/v1/items';

    try {
        const response = await fetch(url, {
            headers: {
                'Accept-Encoding': 'br' // required for Brotli compression
            }
        });
        if (!response.ok) {
            throw new Error(`Skinport API returned status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Skinport data:', error);
        throw new Error('Unable to fetch Skinport data');
    }
};

const processSkinportData = (items: any[]): any[] => {
    // if min_price is not null than the item is tradable ?
    return items.map((item) => ({
        name: item.market_hash_name,
        tradable_min_price: item.min_price ?? item.suggested_price,
        non_tradable_min_price:item.min_price ?? item.suggested_price
    }));
};

export const getSkinportItems = async (): Promise<any[]> => {
    const cacheKey = 'skinport';
    const cachedData = await redis_client.get(cacheKey);

    //disable to avoid reading from redis
    if (cachedData){
        console.log('Cache hit');
        return JSON.parse(cachedData);
    }

    const rawData = await fetchSkinportData();
    const processedData = processSkinportData(rawData);
    
    // save 
    await redis_client.set(cacheKey, JSON.stringify(processedData),{
        EX:300,
        NX: true
    });
    return processedData;
}
