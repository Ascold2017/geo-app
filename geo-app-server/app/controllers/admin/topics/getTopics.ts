import { getTopicList } from "../../../services/admin.service";
import { specFactory } from "../../../config/route-state";

export const getTopicsRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics',
    handler: async (ctx) => {
        ctx.response.body = await getTopicList()
    },
    validate: {}
})