import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";

export const getVapidKeyRoute = createRouteSpec({
    method: 'get',
    path: '/vapid-key',
    handler: async (ctx) => {
        ctx.response.body = { publicKey: process.env.VAPID_PUBLIC_KEY };
    },
    validate: {
        response: z.object({
            publicKey: z.string()
        })
    }
})