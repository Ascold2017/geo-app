import "reflect-metadata";
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import webPush from "web-push";
import { AppDataSource } from "./config/data-source";
import { attachControllers } from "@decorators/express";
import { AuthController } from "./controllers/auth.controller";
import { PushController } from "./controllers/push.controller";
import { LearnController } from "./controllers/learn.controller";
import { AdminController } from "./controllers/admin.controller";
import { LearnService } from "./services/learn.service";

dotenv.config();

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
const apiRouter = express.Router();
attachControllers(apiRouter, [AuthController, PushController, LearnController, AdminController]);

app.use('/api', apiRouter);

const learnService = new LearnService()
AppDataSource.initialize()
  .then(() => {

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
      learnService.checkRepeatNotifierDaemon();
    });
  })
  .catch(console.error)
