import Router from "koa-router";

import { getVapidKey, postPushSubscription } from "./push.controller";

const unprotectedRouter = new Router({ prefix: "/push" });
const userRouter = new Router({ prefix: "/push" });

unprotectedRouter.get("/vapid-key", getVapidKey);
userRouter.post("/subscribe", postPushSubscription);

export default { unprotectedRouter, userRouter };
