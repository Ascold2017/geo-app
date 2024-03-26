import { pushRouter } from "./push";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { learnRouter } from "./learn";
import { appRouter } from "../config/appRouter";

export const apiRouter = appRouter({ prefix: '/api' });

apiRouter.use(pushRouter.routes());
apiRouter.use(adminRouter.routes());
apiRouter.use(authRouter.routes());
apiRouter.use(learnRouter.routes());

