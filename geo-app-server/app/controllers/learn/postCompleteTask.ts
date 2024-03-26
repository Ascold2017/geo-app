import { createRouteSpec } from "koa-zod-router";
import { checkCompletedTask } from "../../services/learn.service";
import { z } from "zod";

export const postCompleteTaskRoute = createRouteSpec({
    method: 'post',
    path: '/complete-task/:id',
    handler: async (ctx) => {
        await checkCompletedTask(ctx.state.user.id, +ctx.request.params.id, ctx.request.body.value)
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        }),
        body: z.object({
            value: z.boolean()
        })
    }
})