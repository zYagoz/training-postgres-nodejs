import { Pool } from 'pg'
import 'dotenv/config';

const pool = new Pool({
    connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/postgres`
});

export async function query(queryString, params, callback) {
    return pool.query(queryString,params, callback);
};