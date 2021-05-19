import { Pool } from 'pg';

const db = new Pool({
    connectionString: process.env.DATABASE_URL
})

db.connect()

export default db;