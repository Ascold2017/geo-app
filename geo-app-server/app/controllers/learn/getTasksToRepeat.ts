import { getTasksToRepeat } from "../../services/learn.service";
import { specFactory } from "../../route-state";

export const getTasksToRepeatRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/tasks-to-repeat',
    handler: async (ctx) => {
        ctx.response.body = await getTasksToRepeat(ctx.state.user.id, ctx.state.user.currentSection as unknown as number)
    }
})