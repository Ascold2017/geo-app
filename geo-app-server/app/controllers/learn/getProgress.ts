import { getProgress } from "../../services/learn.service";
import { specFactory } from "../../route-state";

export const getProgressRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/progress',
    handler: async (ctx) => {
        ctx.response.body = await getProgress(ctx.state.user.id, ctx.state.user.currentSection as unknown as number)
    },
    validate: {}
})