import zodRouter from "koa-zod-router";
import { getSectionsRoute } from "./getSections";
import { postChangeSectionRoute } from "./postChangeSection";
import { getTopicsRoute } from "./getTopics";
import { getTopicByIdRoute } from "./getTopicById";
import { getProgressRoute } from "./getProgress";
import { postReadTaskRoute } from "./postReadTask";
import { postCompleteTaskRoute } from "./postCompleteTask";
import { getTasksToRepeatRoute } from "./getTasksToRepeat";
import { UserState } from "../../config/route-state";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserRoles } from "../../entities/user.entity";
import { appRouter } from "../../config/appRouter";

export const learnRouter = appRouter<UserState>({ prefix: '/learn' })
learnRouter.use(authMiddleware([UserRoles.USER]))

learnRouter.register(getSectionsRoute)
learnRouter.register(postChangeSectionRoute)
learnRouter.register(getTopicsRoute)
learnRouter.register(getTopicByIdRoute)
learnRouter.register(getTasksToRepeatRoute)
learnRouter.register(getProgressRoute)
learnRouter.register(postReadTaskRoute)
learnRouter.register(postCompleteTaskRoute)
