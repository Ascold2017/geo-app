import Router from "koa-router";
import zodRouter from "koa-zod-router";

export const appRouter = (options: Router.IRouterOptions) => zodRouter({
    zodRouter: { exposeRequestErrors: true, exposeResponseErrors: true },
    koaRouter: options
})