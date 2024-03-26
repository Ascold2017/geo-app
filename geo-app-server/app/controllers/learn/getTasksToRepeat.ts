import { createRouteSpec } from "koa-zod-router";
import { getTasksToRepeat } from "../../services/learn.service";

export const getTasksToRepeatRoute = createRouteSpec({
    method: 'get',
    path: '/tasks-to-repeat',
    handler: async (ctx) => {
        ctx.response.body = await getTasksToRepeat(ctx.state.user.id, ctx.state.currentSection)
    }
})