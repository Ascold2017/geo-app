import Router from "koa-router";
import {
  postCompleteTask,
  postReadTask,
  getTaskProgress,
  getTasksToRepeat,
} from "./progress.controller";

const userRouter = new Router({ prefix: "/progress" });

userRouter.get("/list", getTaskProgress);
userRouter.post("/read-task/:id", postReadTask);
userRouter.post("/complete-task/:id", postCompleteTask);
userRouter.get("/tasks-to-repeat", getTasksToRepeat);

export default { userRouter };
