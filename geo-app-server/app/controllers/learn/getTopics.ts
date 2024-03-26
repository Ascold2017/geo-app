import { getTopicList } from "../../services/learn.service";
import { specFactory } from "../../route-state";

export const getTopicsRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics',
    handler: async (ctx) => {
        if (!ctx.state.user.currentSection) {
            ctx.response.body = []
        }
        ctx.response.body = await getTopicList(ctx.state.user.id, ctx.state.user.currentSection.id)
    },
    validate: {

    }
})