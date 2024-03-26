import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import koaBunyanLogger from "koa-bunyan-logger";

import dotenv from "dotenv";
import webPush from "web-push";
import { apiRouter } from "./controllers";
import { logger } from "./logger";
import { AppDataSource } from "./entities";
import { checkRepeatNotifierDaemon } from "./services/learn.service";

dotenv.config();

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const app = new Koa();
const port = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => {

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
