import Router from "koa-router";
import { authByToken, signIn, signUp } from "../services/auth.service";

export const authRouter = new Router({ prefix: '/auth' });

authRouter.post("/sign-in", async ctx => {
    // TODO validation
    // @ts-ignore
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

});
authRouter.post("/sign-up", async (ctx) => {
    // TODO validation
    // @ts-ignore
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
});

authRouter.get("/:token", async (ctx) => {
    // TODO validation
    await authByToken(ctx.params.token)
        .then((user) => {
            ctx.response.body = user;
        })
        .catch((e) => {
            ctx.response.status = 403;
            ctx.response.body = { error: "Доступ запрещен" };
        });
});