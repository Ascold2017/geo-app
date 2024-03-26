import { z } from "zod";
import { specFactory } from "../../../route-state";

export const postTopicTaskRoute = specFactory.createRouteSpec({
    method: 'post',
    path: '/topics/:topicId/tasks',
    handler: async (ctx) => {
        const payload = {
            topic: +ctx.params.topicId,
            ...ctx.request.body
        };
        // @ts-ignore
        ctx.response.body = await createTask(+ctx.params.topicId, payload)
    },
    validate: {
        params: z.object({
            topicId: z.number(),
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