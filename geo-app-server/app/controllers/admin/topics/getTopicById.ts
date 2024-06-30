import { getTopicById } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../config/route-state";

export const getTopicByIdRoute = specFactory.createRouteSpec({
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