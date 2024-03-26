import { z } from "zod";
import { updateTask } from "../../../services/admin.service";
import { specFactory } from "../../../route-state";

export const patchTopicTaskRoute = specFactory.createRouteSpec({
    method: 'patch',
    path: '/topics/:topicId/tasks/:id',
    handler: async (ctx) => {

        ctx.response.body = await updateTask(+ctx.params.topicId, +ctx.params.id, ctx.request.body)
    },
    validate: {
        params: z.object({
            topicId: z.coerce.number(),
            id: z.coerce.number()
        }),
        body: z.object({
            ka: z.string(),
            ru: z.string(),
            transcription: z.string(),
            imageUrl: z.string(),
            soundUrl: z.string(),
            type: z.string()
        })
    }
})