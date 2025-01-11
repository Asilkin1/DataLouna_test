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
        console.log("FetchSkinportData");
        console.log('Raw Skinport Data:', JSON.stringify(data, null, 2)); // Log the raw API response
        return data;
    } catch (error) {
        console.error('Error fetching Skinport data:', error);
        throw new Error('Unable to fetch Skinport data');
    }
};

const processSkinportData = (items: any[]): any[] => {
    console.log(items)
    return items.map((item) => ({
        name: item.market_hash_name
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
