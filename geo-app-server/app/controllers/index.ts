import Router from "koa-router";
import { pushRouter } from "./push.controller";
import { adminRouter } from "./admin.controller";
import { authRouter } from "./auth.controller";
import { learnRouter } from "./learn.controller";

export const apiRouter = new Router({ prefix: '/api' });

apiRouter.use(pushRouter.routes());
apiRouter.use(adminRouter.routes());
apiRouter.use(authRouter.routes());
apiRouter.use(learnRouter.routes());

