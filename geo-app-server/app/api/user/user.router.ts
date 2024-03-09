import Router from "koa-router";
import { signIn, signUp, getUserByToken, getAdmUsers, postChangeSection } from "./user.controller";

import progressRouter from "./progress/progress.router";

const unprotectedRouter = new Router({ prefix: "/users" });
const userRouter = new Router({ prefix: "/users" });
const adminRouter = new Router({ prefix: "/users" });

unprotectedRouter.post("/sign-in", signIn);
unprotectedRouter.post("/sign-up", signUp);
unprotectedRouter.get("/:token", getUserByToken);

userRouter.post('/change-section', postChangeSection)
userRouter.use(progressRouter.userRouter.routes());

adminRouter.get("/", getAdmUsers);

export default { unprotectedRouter, userRouter, adminRouter };
