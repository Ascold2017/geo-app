import zodRouter from "koa-zod-router";
import { getSectionsRoute } from "./getSections";
import { postChangeSectionRoute } from "./postChangeSection";
import { getTopicsRoute } from "./getTopics";
import { getTopicByIdRoute } from "./getTopicById";
import { getProgressRoute } from "./getProgress";
import { postReadTaskRoute } from "./postReadTask";
import { postCompleteTaskRoute } from "./postCompleteTask";
import { getTasksToRepeatRoute } from "./getTasksToRepeat";

export const learnRouter =  zodRouter({ koaRouter: { prefix: '/learn' } })

learnRouter.register(getSectionsRoute)
learnRouter.register(postChangeSectionRoute)
learnRouter.register(getTopicsRoute)
learnRouter.register(getTopicByIdRoute)
learnRouter.register(getTasksToRepeatRoute)
learnRouter.register(getProgressRoute)
learnRouter.register(postReadTaskRoute)
learnRouter.register(postCompleteTaskRoute)
