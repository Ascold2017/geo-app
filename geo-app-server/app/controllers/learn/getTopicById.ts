import { getUserTopic } from "../../services/learn.service";
import { z } from "zod";
import { specFactory } from "../../config/route-state";

export const getTopicByIdRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics/:id',
    handler: async (ctx) => {
        try {
            ctx.response.body = await getUserTopic(ctx.state.user.id, +ctx.request.params.id)
        } catch {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден(" };
        }
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        })
    }
})