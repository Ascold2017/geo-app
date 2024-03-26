import { pushRouter } from "./push";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { learnRouter } from "./learn";
import zodRouter from "koa-zod-router";

export const apiRouter = zodRouter({ koaRouter: { prefix: '/api' } });

apiRouter.use(pushRouter.routes());
apiRouter.use(adminRouter.routes());
apiRouter.use(authRouter.routes());
apiRouter.use(learnRouter.routes());

