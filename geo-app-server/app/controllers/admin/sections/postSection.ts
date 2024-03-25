import { createRouteSpec } from "koa-zod-router";
import { createSection } from "../../../services/admin.service";
import { z } from "zod";

export const postSectionRoute = createRouteSpec({
    method: 'post',
    path: '/sections',
    handler: async (ctx) => {
        const { title, imageUrl } = ctx.request.body;
        ctx.response.body = await createSection(title, imageUrl)
    },
    validate: {
        body: z.object({
            title: z.string(),
            imageUrl: z.string()
        })
    }
})