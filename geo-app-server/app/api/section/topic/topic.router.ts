import Router from "koa-router";
import {
  createTopic,
  deleteTopic,
  getTopicList,
  getUserTopic,
  patchTopic,
  getUserTopicList,
  getTopic,
} from "./topic.controller";
import taskRouter from "./task/task.router";

const userRouter = new Router({ prefix: "/topics" });
const userRouterById = new Router({ prefix: "/:sectionId/topics" });

const adminRouter = new Router({ prefix: "/topics" });
const adminRouterById = new Router({ prefix: "/:sectionId/topics" });

userRouter.get("/", getUserTopicList);
userRouter.get("/:id", getUserTopic);

adminRouter.get("/", getTopicList);
adminRouter.get("/:id", getTopic);
adminRouter.post("/", createTopic);
adminRouter.patch("/:id", patchTopic);
adminRouter.delete("/:id", deleteTopic);
adminRouter.use(taskRouter.adminRouterByTopicId.routes());

export default { userRouter, userRouterById, adminRouter, adminRouterById };
