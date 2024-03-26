import { deleteTopic } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../route-state";

export const deleteTopicByIdRoute = specFactory.createRouteSpec({
    method: 'delete',
    path: '/topics/:id',
    handler: async (ctx) => {
        await deleteTopic(+ctx.params.id)
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
            id: z.coerce.number()
        })
    }
})