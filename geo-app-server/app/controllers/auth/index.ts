import zodRouter from "koa-zod-router";
import { postSignInRoute } from "./postSignIn";
import { postSignUpRoute } from "./postSignUp";
import { getTokenRoute } from "./getToken";
import { appRouter } from "../../config/appRouter";

export const authRouter = appRouter({ prefix: '/auth' });

authRouter.register(postSignInRoute)
authRouter.register(postSignUpRoute)
authRouter.register(getTokenRoute)