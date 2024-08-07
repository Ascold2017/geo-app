import { getTopicList } from "../../services/learn.service";
import { specFactory } from "../../config/route-state";

export const getTopicsRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics',
    handler: async (ctx) => {
        if (!ctx.state.user.currentSection) {
            ctx.response.body = []
        }
        ctx.response.body = await getTopicList(ctx.state.user.id, ctx.state.user.currentSection as unknown as number)
    },
    validate: {

    }
})