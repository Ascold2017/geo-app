import { z } from "zod";
import { updateSection } from "../../../services/admin.service";
import { specFactory } from "../../../config/route-state";

export const patchSectionByIdRoute = specFactory.createRouteSpec({
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