import { getUsers } from "../../services/admin.service";
import { specFactory } from "../../config/route-state";

export const getUsersRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/users',
    handler: async (ctx) => {
        ctx.response.body = await getUsers()
    },
    validate: {}
});