import Router from "koa-router";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRoles } from "../entities/user.entity";
import { changeUserSection, checkCompletedTask, checkReadedTask, getProgress, getSections, getTasksToRepeat, getTopicList, getUserNearestRepeatDate, getUserTopic } from "../services/learn.service";
import { uncheckRecieveNotification } from "../services/push.service";

export const learnRouter = new Router({ prefix: '/learn' }).use(authMiddleware([UserRoles.USER]));

learnRouter.get('/sections', async (ctx) => {
    ctx.response.body = await getSections()
});

learnRouter.post('/change-section', async (ctx) => {
    await changeUserSection(ctx.state.user, ctx.request.body.sectionId)
    ctx.response.body = { ok: true }
})

learnRouter.get('/topics', async (ctx) => {
    if (!ctx.state.user.currentSection) {
        ctx.response.body = []
    }
    ctx.response.body = await getTopicList(ctx.state.user.id, ctx.state.user.currentSection)
});

learnRouter.get('/topics/:id', async (ctx) => {
    try {
        ctx.response.body = await getUserTopic(ctx.state.user.id, +ctx.params.id)
    } catch {
        ctx.response.status = 404;
        ctx.response.body = { error: "Не найден(" };
    }
});


learnRouter.get("/progress", async (ctx) => {
    ctx.response.body = await getProgress(ctx.state.user.id, ctx.state.user.currentSection)
});

learnRouter.post("/read-task/:id", async (ctx) => {
    await checkReadedTask(ctx.state.user.id, +ctx.params.id)

    // Check is training completed
    const nextRepeat = await getUserNearestRepeatDate(ctx.state.user);
    if (nextRepeat && nextRepeat > new Date().getTime()) {
        uncheckRecieveNotification(ctx.state.user.id);
    }

    ctx.response.body = { ok: true }
});
learnRouter.post("/complete-task/:id", async (ctx) => {
    await checkCompletedTask(ctx.state.user.id, +ctx.params.id, ctx.request.body.value)
});

learnRouter.get("/tasks-to-repeat", async (ctx) => {
    ctx.response.body = await getTasksToRepeat(ctx.state.user.id, ctx.state.currentSection)
});