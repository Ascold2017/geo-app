import zodRouter from "koa-zod-router";
import { getVapidKeyRoute } from "./getVapidKey";
import { postSubscriptionRoute } from "./postSubscription";

const pushRouterPublic = zodRouter();
const pushRouterUser = zodRouter();

pushRouterPublic.register(getVapidKeyRoute)
pushRouterUser.register(postSubscriptionRoute)

export const pushRouter =  zodRouter({ koaRouter: { prefix: '/push' } })
    .use(pushRouterPublic.routes())
    .use(pushRouterUser.routes())