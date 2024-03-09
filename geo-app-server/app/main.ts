import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import koaStatic from "koa-static";
import koaBunyanLogger from "koa-bunyan-logger";

import dotenv from "dotenv";
import webPush from "web-push";
import apiRouter from "./api/api.router";
import path from "path";
import { logger } from "./logger";
import { checkRepeatNotifierDaemon } from "./api/user/progress/progress.service";
import { AppDataSource } from "./data-source";
import { EntityManager, Repository } from "typeorm";
import { User } from "./api/user/user.entity";
import { Section } from "./api/section/section.entity";
import { Push } from "./api/push/push.entity";
import { Task } from "./api/section/topic/task/task.entity";
import { Topic } from "./api/section/topic/topic.entity";
import { Progress } from "./api/user/progress/progress.entity";

dotenv.config();

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export const DI = {} as {
  em: EntityManager
  user: Repository<User>;
  section: Repository<Section>;
  topic: Repository<Topic>;
  task: Repository<Task>;
  progress: Repository<Progress>;
  push: Repository<Push>;
};

const app = new Koa();
const port = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => {
    DI.em = AppDataSource.manager;
    DI.user = AppDataSource.getRepository(User);
    DI.section = AppDataSource.getRepository(Section);
    DI.topic = AppDataSource.getRepository(Topic);
    DI.task = AppDataSource.getRepository(Task);
    DI.progress = AppDataSource.getRepository(Progress);
    DI.push = AppDataSource.getRepository(Push);

    app.use(koaBunyanLogger(logger));
    app.use(cors());
    app.use(koaBody());

    app.use(apiRouter.routes());
    app.use(apiRouter.allowedMethods());
    app.use((ctx, next) => {
      ctx.status = 404;
      ctx.body = { message: "No route found" };
    });

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
      checkRepeatNotifierDaemon();
    });
  })
  .catch(console.error)
