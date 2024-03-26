import { deleteSection } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../route-state";

export const deleteSectionByIdRoute = specFactory.createRouteSpec({
    method: 'delete',
    path: '/sections/:id',
    handler: async (ctx) => {
        try {
            ctx.response.body = await deleteSection(+ctx.request.params.id)
        } catch {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден" };
        }
    },
    validate: {
        params: z.object({
            id: z.coerce.number()
        })
    }
})