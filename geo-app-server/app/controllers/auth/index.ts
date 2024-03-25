import zodRouter from "koa-zod-router";
import { postSignInRoute } from "./postSignIn";
import { postSignUpRoute } from "./postSignUp";
import { getTokenRoute } from "./getToken";

export const authRouter = zodRouter({ koaRouter: { prefix: '/auth' } });

authRouter.register(postSignInRoute)
authRouter.register(postSignUpRoute)
authRouter.register(getTokenRoute)