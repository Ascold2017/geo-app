import Router from "koa-router";
import { createTask, deleteTask, patchTask } from "./task.controller";

const adminRouterByTopicId = new Router({ prefix: "/:topicId/tasks" });

adminRouterByTopicId.post("/", createTask);
adminRouterByTopicId.patch("/:id", patchTask);
adminRouterByTopicId.delete("/:id", deleteTask);

export default { adminRouterByTopicId };
