import { createRouteSpec } from "koa-zod-router";
import { getUsers } from "../../services/admin.service";

export const getUsersRoute = createRouteSpec({
    method: 'get',
    path: '/users',
    handler: async (ctx) => {
        ctx.response.body = await getUsers()
    },
    validate: {}
});