import { Context } from "koa";
import { DI } from "../../main";
import { sendNotificationById } from "./push.service";
import { LessThan } from "typeorm";

export const getVapidKey = (context: Context) => {
  context.response.body = { publicKey: process.env.VAPID_PUBLIC_KEY };
};

export const postPushSubscription = async (context: Context) => {
  const data = context.request.body;
  let push = await DI.push.findOne({ where: { user: { id: context.state.user.id }, deviceId: data.deviceId }, relations: { user: true } });
  if (push) {
    DI.push.merge(push, { subscription: data.subscription })
  } else {
    push = DI.push.create({
      user: context.state.user.id,
      subscription: data.subscription,
      deviceId: data.deviceId
    });
  }

  await DI.push.save(push);

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

  context.response.body = { ok: true };
};
