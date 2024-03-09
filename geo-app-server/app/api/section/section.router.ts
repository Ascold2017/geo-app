import Router from "koa-router";
import topicRouter from "./topic/topic.router";
import {
  deleteAdmSection,
  getAdmSection,
  getAdmSectionList,
  getSectionList,
  patchAdmSection,
  postAdmSection,
} from "./section.controller";

const userRouter = new Router({ prefix: "/sections" });
const admRouter = new Router({ prefix: "/sections" });

userRouter.use(topicRouter.userRouter.routes());
userRouter.use(topicRouter.userRouterById.routes());
userRouter.get("/", getSectionList);

admRouter.use(topicRouter.adminRouter.routes());
admRouter.use(topicRouter.adminRouterById.routes());

admRouter.get("/", getAdmSectionList);
admRouter.get("/:id", getAdmSection);
admRouter.post("/", postAdmSection);
admRouter.patch("/:id", patchAdmSection);
admRouter.delete("/:id", deleteAdmSection);

export default { userRouter, admRouter };
