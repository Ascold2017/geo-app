import { createRouteSpec } from "koa-zod-router";
import { signIn } from "../../services/auth.service";
import { z } from "zod";

export const postSignInRoute = createRouteSpec({
    method: 'post',
    path: '/sign-in',
    handler: async (ctx) => {
        const { login, password } = ctx.request.body;

        await signIn(login, password)
            .then(user => {
                ctx.response.body = user;
            })
            .catch((e) => {
                console.log(e)
                ctx.response.status = 403;
                ctx.response.body = { error: "Неверный логин/пароль" };
            })
    },
    validate: {
        body: z.object({
            login: z.string(),
            password: z.string()
        })
    }
})