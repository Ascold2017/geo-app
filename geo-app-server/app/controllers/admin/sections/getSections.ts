import { getSections } from "../../../services/admin.service";
import { specFactory } from "../../../route-state";

export const getSectionsRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/sections',
    handler: async (ctx) => {
        ctx.response.body = await getSections()
    },
    validate: {}
})