import Router from "koa-router";
import zodRouter, { ValidationErrorHandler } from "koa-zod-router";


const validationErrorHandler: ValidationErrorHandler = async (ctx, next) => {
    if (ctx.invalid.error) {
        ctx.status = 422;
        ctx.body = {
            message: "Validation failed",
            details: ctx.invalid.body.flatten()
        }
    } else {
        await next();
    }
};


export const appRouter = <T>(options: Router.IRouterOptions) => zodRouter<T>({
    zodRouter: { exposeRequestErrors: true, exposeResponseErrors: true, validationErrorHandler },
    koaRouter: options
})