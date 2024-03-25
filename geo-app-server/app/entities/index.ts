import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Progress } from './progress.entity';
import { Push } from './push.entity';
import { Section } from './section.entity';
import { Task } from './task.entity';
import { Topic } from './topic.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity'

dotenv.config()

const isDev = process.env.TS_NODE_DEV === "true";

export const AppDataSource = new DataSource({
    url: process.env.DB_URI,
    type: "postgres",
    logging: isDev,
    entities: [User, Section, Topic, Task, Progress, Push, BaseEntity],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: "migration",
    synchronize: isDev,
    ssl: true,
})

export const DI = {
    em: AppDataSource.manager,
    user: AppDataSource.getRepository(User),
    section: AppDataSource.getRepository(Section),
    topic: AppDataSource.getRepository(Topic),
    task: AppDataSource.getRepository(Task),
    progress: AppDataSource.getRepository(Progress),
    push: AppDataSource.getRepository(Push)
}