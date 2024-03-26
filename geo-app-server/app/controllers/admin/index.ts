import zodRouter from "koa-zod-router";
import { UserRoles } from "../../entities/user.entity";
import {authMiddleware} from "../../middlewares/authMiddleware";
import { getUsersRoute } from "./getUsers";
import { getSectionsRoute } from "./sections/getSections";
import { postSectionRoute } from "./sections/postSection";
import { patchSectionByIdRoute } from "./sections/patchSectionById";
import { deleteSectionByIdRoute } from "./sections/deleteSectionById";
import { getTopicsRoute } from "./topics/getTopics";
import { getTopicByIdRoute } from "./topics/getTopicById";
import { postTopicRoute } from "./topics/postTopic";
import { patchTopicByIdRoute } from "./topics/patchTopicById";
import { postTopicTaskRoute } from "./topicTasks/postTopicTask";
import { patchTopicTaskRoute } from "./topicTasks/patchTopicTask";
import { deleteTopicTaskRoute } from "./topicTasks/deleteTopicTask";
import { UserState } from "../../config/route-state";
import { appRouter } from "../../config/appRouter";

export const adminRouter = appRouter<UserState>({ prefix: '/adm' })
adminRouter.use(authMiddleware([UserRoles.ADMIN]));

adminRouter.register(getUsersRoute);

adminRouter.register(getSectionsRoute);
adminRouter.register(postSectionRoute);
adminRouter.register(patchSectionByIdRoute);
adminRouter.register(deleteSectionByIdRoute);

adminRouter.register(getTopicsRoute);
adminRouter.register(getTopicByIdRoute);
adminRouter.register(postTopicRoute);
adminRouter.register(patchTopicByIdRoute);
adminRouter.register(deleteSectionByIdRoute);

adminRouter.register(postTopicTaskRoute);
adminRouter.register(patchTopicTaskRoute);
adminRouter.register(deleteTopicTaskRoute);