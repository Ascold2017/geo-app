import { createRouteSpec } from "koa-zod-router";
import { authByToken } from "../../services/auth.service";
import { z } from "zod";

export const getTokenRoute = createRouteSpec({
    method: 'get',
    path: '/:token',
    handler: async (ctx) => {
        await authByToken(ctx.params.token)
            .then((user) => {
                ctx.response.body = user;
            })
            .catch((e) => {
                ctx.response.status = 403;
                ctx.response.body = { error: "Доступ запрещен" };
            });
    },
    validate: {
        params: z.object({
            token: z.string()
        })
    }
})