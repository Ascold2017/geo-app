import { createRouteSpec } from "koa-zod-router";
import { getTopicList } from "../../../services/admin.service";

export const getTopicsRoute = createRouteSpec({
    method: 'get',
    path: '/topics',
    handler: async (ctx) => {
        ctx.response.body = await getTopicList()
    },
    validate: {}
})