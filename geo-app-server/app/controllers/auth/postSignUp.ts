import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";
import { signUp } from "../../services/auth.service";

export const postSignUpRoute = createRouteSpec({
    method: 'post',
    path: '/sign-up',
    handler: async (ctx) => {
        const { login, password } = ctx.request.body;
        await signUp(login, password)
            .then(user => {
                ctx.response.body = user;
            })
            .catch((e) => {
                console.log(e)
                ctx.response.status = 400;
                ctx.response.body = {
                    error: "Пользователь с таким ником уже существует",
                };
            })
    },
    validate: {
        body: z.object({
            login: z.string(),
            password: z.string()
        })
    }
})