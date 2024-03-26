import { z } from "zod";
import { changeUserSection } from "../../services/learn.service";
import { specFactory } from "../../route-state";

export const postChangeSectionRoute = specFactory.createRouteSpec({
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