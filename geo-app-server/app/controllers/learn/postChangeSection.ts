import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";
import { changeUserSection } from "../../services/learn.service";

export const postChangeSectionRoute = createRouteSpec({
    method: 'post',
    path: '/change-section',
    handler: async (ctx) => {
        await changeUserSection(ctx.state.user, ctx.request.body.sectionId)
        ctx.response.body = { ok: true }
    },
    validate: {
        body: z.object({
            sectionId: z.number()
        })
    }
})