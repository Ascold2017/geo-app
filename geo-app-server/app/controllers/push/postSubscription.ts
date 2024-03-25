import { createRouteSpec } from "koa-zod-router";
import { savePushSubscription, sendNotificationByUserId } from "../../services/push.service";
import { checkIsShouldRepeatForUser } from "../../services/learn.service";
import { z } from "zod";

export const postSubscriptionRoute = createRouteSpec({
    method: 'post',
    path: '/subscription',
    handler: async (ctx) => {
        await savePushSubscription(ctx.state.user.id, ctx.request.body.subscription, ctx.request.body.deviceId)
        const shouldRepeat = checkIsShouldRepeatForUser(ctx.state.user.id);
        if (shouldRepeat) {
            sendNotificationByUserId(
                ctx.state.user.id,
                "Привет :) Пора потренироваться!",
            );
        }
        ctx.response.body = { ok: true };
    },
    validate: {
        body: z.object({
            subscription: z.any(),
            deviceId: z.string()
        })
    }
})