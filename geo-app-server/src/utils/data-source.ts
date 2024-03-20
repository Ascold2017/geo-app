import { DataSource, EntityManager, Repository } from 'typeorm'
import dotenv from 'dotenv'
import { Progress } from '../entities/progress.entity';
import { Push } from '../entities/push.entity';
import { Section } from '../entities/section.entity';
import { Task } from '../entities/task.entity';
import { Topic } from '../entities/topic.entity';
import { User } from '../entities/user.entity';

dotenv.config()

const isDev = process.env.TS_NODE_DEV === "true";

export const AppDataSource = new DataSource({
    url: process.env.DB_URI,
    type: "postgres",
    logging: isDev,
    entities: ['./src/app/entities/*.entity.ts'],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: "migration",
    synchronize: isDev,
    ssl: true,
})


export const DI = {} as {
    em: EntityManager
    user: Repository<User>;
    section: Repository<Section>;
    topic: Repository<Topic>;
    task: Repository<Task>;
    progress: Repository<Progress>;
    push: Repository<Push>;
};

export const initDataSource = function () {
    return AppDataSource.initialize()
        .then(() => {
            DI.em = AppDataSource.manager;
            DI.user = AppDataSource.getRepository(User);
            DI.section = AppDataSource.getRepository(Section);
            DI.topic = AppDataSource.getRepository(Topic);
            DI.task = AppDataSource.getRepository(Task);
            DI.progress = AppDataSource.getRepository(Progress);
            DI.push = AppDataSource.getRepository(Push);
        })
}