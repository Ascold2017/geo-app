import { createRouteSpec } from "koa-zod-router";
import { createTopic } from "../../../services/admin.service";
import { z } from "zod";


export const postTopicRoute = createRouteSpec({
    method: 'post',
    path: '/topics',
    handler: async (ctx) => {
        ctx.response.body = await createTopic(ctx.request.body)
    },
    validate: {
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