import { createRouteSpec } from "koa-zod-router";
import { getSections } from "../../services/learn.service";

export const getSectionsRoute = createRouteSpec({
    method: 'get',
    path: '/sections',
    handler: async (ctx) => {
        ctx.response.body = await getSections()
    },
    validate: {}
})