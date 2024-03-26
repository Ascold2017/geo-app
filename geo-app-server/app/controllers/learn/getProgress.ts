import { createRouteSpec } from "koa-zod-router";
import { getProgress } from "../../services/learn.service";

export const getProgressRoute = createRouteSpec({
    method: 'get',
    path: '/progress',
    handler: async (ctx) => {
        ctx.response.body = await getProgress(ctx.state.user.id, ctx.state.user.currentSection)
    },
    validate: {}
})