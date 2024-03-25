import Router from "koa-router";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRoles } from "../entities/user.entity";
import { savePushSubscription, sendNotificationByUserId } from "../services/push.service";
import { checkIsShouldRepeatForUser } from "../services/learn.service";

const pushRouterPublic = new Router();
const pushRouterUser = new Router().use(authMiddleware([UserRoles.USER]));

pushRouterPublic.get('/vapid-key', ctx => {
    ctx.response.body = { publicKey: process.env.VAPID_PUBLIC_KEY };
})

pushRouterUser.post('/subscribe', async (ctx) => {
    // TODO validation
    await savePushSubscription(ctx.state.user.id, ctx.request.body.subscription, ctx.request.body.deviceId)
    const shouldRepeat = checkIsShouldRepeatForUser(ctx.state.user.id);
    if (shouldRepeat) {
        sendNotificationByUserId(
            ctx.state.user.id,
            "Привет :) Пора потренироваться!",
        );
    }
    ctx.response.body = { ok: true };
})

export const pushRouter = new Router({ prefix: '/push' })
    .use(pushRouterPublic.routes())
    .use(pushRouterUser.routes())