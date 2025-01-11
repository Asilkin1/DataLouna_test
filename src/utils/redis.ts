import { createClient} from "redis";
import dotenv from 'dotenv';

dotenv.config();


// from cloud.redis.io
const redis_client = createClient({
    username: process.env.REDIS_USERNAME,
    password:  process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 15823
    }
});

redis_client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    await redis_client.connect();
})();

export default redis_client
