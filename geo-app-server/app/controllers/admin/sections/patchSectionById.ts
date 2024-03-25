import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";
import { updateSection } from "../../../services/admin.service";

export const patchSectionByIdRoute = createRouteSpec({
    method: 'patch',
    path: '/sections/:id',
    handler: async (ctx) => {
        await updateSection(+ctx.params.id, ctx.request.body)
        .then(section => {
            ctx.response.body = section;
        })
        .catch((e) => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден" };
        })
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        }),
        body: z.object({
            title: z.string(),
            imageUrl: z.string()
        })
    }
})