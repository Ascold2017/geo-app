import { createRouteSpec } from "koa-zod-router";
import { getTopicById } from "../../../services/admin.service";
import { z } from "zod";

export const getTopicByIdRoute = createRouteSpec({
    method: 'get',
    path: '/topics/:id',
    handler: async (ctx) => {
        ctx.response.body = await getTopicById(+ctx.params.id)
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        })
    }
})