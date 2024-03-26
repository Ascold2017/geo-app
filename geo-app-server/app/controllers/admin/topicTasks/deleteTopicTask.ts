import { deleteTask } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../route-state";

export const deleteTopicTaskRoute = specFactory.createRouteSpec({
    method: 'delete',
    path: '/topics/:topicId/tasks/:id',
    handler: async (ctx) => {
        await deleteTask(+ctx.params.id)
        .then(() => {
            ctx.response.body = { ok: true };
        })
        .catch(e => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден(" };
        })
    },
    validate: {
        params: z.object({
            topicId: z.coerce.number(),
            id: z.coerce.number()
        })
    }
})