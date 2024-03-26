import { createRouteSpec } from "koa-zod-router";
import { checkReadedTask, getUserNearestRepeatDate } from "../../services/learn.service";
import { uncheckRecieveNotification } from "../../services/push.service";
import { z } from "zod";

export const postReadTaskRoute = createRouteSpec({
    method: 'post',
    path: '/read-task/:id',
    handler: async (ctx) => {
        await checkReadedTask(ctx.state.user.id, +ctx.request.params.id)

    // Check is training completed
    const nextRepeat = await getUserNearestRepeatDate(ctx.state.user);
    if (nextRepeat && nextRepeat > new Date().getTime()) {
        uncheckRecieveNotification(ctx.state.user.id);
    }

    ctx.response.body = { ok: true }
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        })
    }
})