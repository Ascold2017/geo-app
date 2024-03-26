import { updateTopic } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../route-state";

export const patchTopicByIdRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/topics/:id',
    handler: async (ctx) => {
        ctx.response.body = await updateTopic(+ctx.params.id, ctx.request.body)
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        }),
        body: z.object({
            title: z.string(),
            text: z.string(),
            videoId: z.string(),
            sectionId: z.number(),
            isPremium: z.boolean(),
            order: z.number()
        })
    }
})