import { getTopicTasks } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../config/route-state";

export const getTopicTasksRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics/:topicId/tasks',
    handler: async (ctx) => {
        await getTopicTasks(+ctx.params.topicId)
        .then((data) => {
            ctx.response.body = data;
        })
        .catch(e => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден(" };
        })
    },
    validate: {
        params: z.object({
            topicId: z.coerce.number(),
        })
    }
})