import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Progress } from '../entities/progress.entity';
import { Push } from '../entities/push.entity';
import { Section } from '../entities/section.entity';
import { Task } from '../entities/task.entity';
import { Topic } from '../entities/topic.entity';
import { User } from '../entities/user.entity';
import { BaseEntity } from '../entities/base.entity';

dotenv.config()

const isDev = process.env.TS_NODE_DEV === "true";

export const AppDataSource = new DataSource({
    url: process.env.DB_URI,
    type: "postgres",
    logging: isDev,
    entities: [User, BaseEntity, Section, Topic, Task, Progress, Push],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: "migration",
    synchronize: isDev,
    ssl: false,
});

export const DI = {
    em: AppDataSource.manager,
    user: AppDataSource.getRepository(User),
    section: AppDataSource.getRepository(Section),
    topic: AppDataSource.getRepository(Topic),
    task: AppDataSource.getRepository(Task),
    progress: AppDataSource.getRepository(Progress),
    push: AppDataSource.getRepository(Push)
}