import { getSectionById } from "../../../services/admin.service";
import { z } from "zod";
import { specFactory } from "../../../config/route-state";

export const getSectionByIdRoute = specFactory.createRouteSpec({
    method: 'get',
    path: '/sections/:id',
    handler: async (ctx) => {
        try {
            ctx.response.body = await getSectionById(+ctx.params.id)
        } catch (e) {
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