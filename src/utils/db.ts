import postgres from "postgres";
import dotenv from 'dotenv'

dotenv.config();

const sql = postgres(process.env.DATABASE as string, {ssl: false});

export default sql;