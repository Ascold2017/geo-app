import { createRouteSpec } from "koa-zod-router";
import { getTopicList } from "../../services/learn.service";

export const getTopicsRoute = createRouteSpec({
    method: 'get',
    path: '/topics',
    handler: async (ctx) => {
        if (!ctx.state.user.currentSection) {
            ctx.response.body = []
        }
        ctx.response.body = await getTopicList(ctx.state.user.id, ctx.state.user.currentSection)
    },
    validate: {

    }
})