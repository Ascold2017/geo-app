import Router from "koa-router";
import { pushRouter } from "./push.controller";

export const apiRouter = new Router()

apiRouter.use(pushRouter.routes())