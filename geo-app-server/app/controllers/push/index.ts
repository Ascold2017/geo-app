import zodRouter from "koa-zod-router";
import { getVapidKeyRoute } from "./getVapidKey";
import { postSubscriptionRoute } from "./postSubscription";
import { UserState } from "../../config/route-state";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserRoles } from "../../entities/user.entity";
import { appRouter } from "../../config/appRouter";

const pushRouterPublic = appRouter({});
const pushRouterUser = appRouter<UserState>({});
pushRouterUser.use(authMiddleware([UserRoles.USER]))

pushRouterPublic.register(getVapidKeyRoute)
pushRouterUser.register(postSubscriptionRoute)

export const pushRouter = appRouter({ prefix: '/push' })
    .use(pushRouterPublic.routes())
    .use(pushRouterUser.routes())