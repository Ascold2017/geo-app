import zodRouter from "koa-zod-router";
import { getVapidKeyRoute } from "./getVapidKey";
import { postSubscriptionRoute } from "./postSubscription";
import { UserState } from "../../config/route-state";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserRoles } from "../../entities/user.entity";

const pushRouterPublic = zodRouter();
const pushRouterUser = zodRouter<UserState>();
pushRouterUser.use(authMiddleware([UserRoles.USER]))

pushRouterPublic.register(getVapidKeyRoute)
pushRouterUser.register(postSubscriptionRoute)

export const pushRouter =  zodRouter({ koaRouter: { prefix: '/push' } })
    .use(pushRouterPublic.routes())
    .use(pushRouterUser.routes())