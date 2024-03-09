import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const isDev = process.env.TS_NODE_DEV === "true" ;

export const AppDataSource = new DataSource({
    url: process.env.DB_URI,
    type: "postgres",
    logging: isDev,
    entities: ['./app/**/*.entity.ts'],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: "migration",
    synchronize: isDev,
    ssl: true,
})
