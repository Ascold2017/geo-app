import Router from "koa-router";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRoles } from "../entities/user.entity";
import { createSection, createTask, createTopic, deleteSection, deleteTask, deleteTopic, getSectionById, getSections, getTopicById, getTopicList, getUsers, updateSection, updateTask, updateTopic } from "../services/admin.service";

export const adminRouter = new Router({ prefix: '/adm' }).use(authMiddleware([UserRoles.ADMIN]));

adminRouter.get('/users', async (ctx) => {
    ctx.response.body = await getUsers()
});

// sections //
adminRouter.get("/sections", async (ctx) => {
    ctx.response.body = await getSections()
});

adminRouter.get("/sections/:id", async (ctx) => {
    try {
        ctx.response.body = await getSectionById(+ctx.params.id)
    } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Не найден" };
    }
});

adminRouter.post("/sections", async (ctx) => {
    // TODO validation 
    // @ts-ignore
    ctx.response.body = await createSection(ctx.request.body.title as string, ctx.request.body.imageUrl as string)
});

adminRouter.patch("/sections/:id", async (ctx) => {
    // TODO validation
    // @ts-ignore
    await updateSection(+ctx.params.id, ctx.request.body)
        .then(section => {
            ctx.response.body = section;
        })
        .catch((e) => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден" };
        })
});

adminRouter.delete("/sections/:id", async (ctx) => {
    try {
        ctx.response.body = await deleteSection(+ctx.params.id)
    } catch {
        ctx.response.status = 404;
        ctx.response.body = { error: "Не найден" };
    }
});


// topics //
adminRouter.get("/topics", async (ctx) => {
    ctx.response.body = await getTopicList()
});

adminRouter.get("/topics/:id", async (ctx) => {
    ctx.response.body = await getTopicById(+ctx.params.id)
});

adminRouter.post("/topics", async (ctx) => {
    const data = ctx.request.body as any;
    const payload = {
        title: data.title,
        text: data.text,
        videoId: data.videoId,
        section: data.sectionId,
        isPremium: data.isPremium,
        order: data.order
    }
    ctx.response.body = await createTopic(payload)
});

adminRouter.patch("/topics/:id", async (ctx) => {
    const data = ctx.request.body as any;
    const payload = {
        title: data.title,
        text: data.text,
        videoId: data.videoId,
        section: data.sectionId,
        isPremium: data.isPremium,
        order: data.order
    }
    ctx.response.body = await updateTopic(+ctx.params.id, payload)
});

adminRouter.delete("/topics/:id", async (ctx) => {
    await deleteTopic(+ctx.params.id)
        .then(() => {
            ctx.response.body = { ok: true };
        })
        .catch(e => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден(" };
        })
});

adminRouter.post("/topics/:topicId/tasks", async (ctx) => {
    const body = ctx.request.body;
    const payload = {
        topic: +ctx.params.topicId,
        ka: body.ka,
        ru: body.ru,
        transcription: body.transcription,
        imageUrl: body.imageUrl,
        soundUrl: body.soundUrl,
        type: body.type,
    };
    // @ts-ignore
    ctx.response.body = await createTask(+ctx.params.topicId, payload)
});

adminRouter.patch("/topics/:topicId/tasks/:id", async (ctx) => {
    const body = ctx.request.body;
    const payload = {
        ka: body.ka,
        ru: body.ru,
        transcription: body.transcription,
        imageUrl: body.imageUrl,
        soundUrl: body.soundUrl,
        type: body.type,
    };
    ctx.response.body = await updateTask(+ctx.params.topicId, +ctx.params.id, payload)
});

adminRouter.delete("/topics/:topicId/tasks/:id", async (ctx) => {
    await deleteTask(+ctx.params.id)
        .then(() => {
            ctx.response.body = { ok: true };
        })
        .catch(e => {
            ctx.response.status = 404;
            ctx.response.body = { error: "Не найден(" };
        })
});