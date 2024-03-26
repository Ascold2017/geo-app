import { getTasksToRepeat, getUserNearestRepeatDate } from "../../services/learn.service";
import { specFactory } from "../../route-state";
import { ProgressListDTO } from "../../dto/progress.dto";

export const getTasksToRepeatRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/tasks-to-repeat',
    handler: async (ctx) => {
        const progress = await getTasksToRepeat(ctx.state.user.id, ctx.state.user.currentSection as unknown as number)
        const nextRepeat = await getUserNearestRepeatDate(ctx.state.user)
        ctx.response.body = new ProgressListDTO(
            progress,
            nextRepeat
        ) 
    }
})