import Router from "koa-router";
import { authMiddleware } from '../middlewares/authMiddleware'
import { UserRoles } from "../entities/user.entity";
import { broker } from "../utils/service-broker";


const unprotectedRouter = new Router();
const userRouter = new Router();
userRouter.use(authMiddleware([UserRoles.USER]))

unprotectedRouter.get("/vapid-key", (ctx) => {
    ctx.response.body = {
        publicKey: process.env.VAPID_PUBLIC_KEY
    }
});
userRouter.post("/subscribe", (ctx) => {
    broker.call('push.saveSubscription', {
        userId: ctx.state.user.id,
        deviceId: ctx.request.body.deviceId,
        subscription: ctx.request.body.subscription
    });

    /*
  const shouldRepeat = await DI.progress.countBy({
    isCompleted: false,
    nextRepeat: LessThan(new Date().getTime()),
    user: { id: context.state.user.id },
  }) > 0;

  if (shouldRepeat) {
    sendNotificationById(
      context.state.user.id,
      "Привет :) Пора потренироваться!",
    );
  }
  */
});

export const pushRouter = new Router({ prefix: '/push' })
    .use(unprotectedRouter.routes())
    .use(userRouter.routes())
