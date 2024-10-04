import WebPush, { PushSubscription } from "web-push";
import { DI } from "../config/data-source";

export class PushService {
  async sendNotificationByUserId(userId: number, message: string) {
    const subs = await DI.push.findBy({
      user: { id: userId },
      isSendedNotification: false,
    });

    subs.forEach(async (sub) => {
      WebPush.sendNotification(sub.subscription, message);
      DI.push.merge(sub, { isSendedNotification: true });
      await DI.push.save(sub);
    });
  }

  async uncheckRecieveNotification(id: number) {
    const subs = await DI.push.findBy({ user: { id } });
    subs.forEach(async (sub) => {
      DI.push.merge(sub, { isSendedNotification: false });
      await DI.push.save(sub);
    });
  }

  async savePushSubscription(
    userId: number,
    subscription: PushSubscription,
    deviceId: string
  ) {
    let push = await DI.push.findOne({
      where: { user: { id: userId }, deviceId: deviceId },
      relations: { user: true },
    });
    if (push) {
      DI.push.merge(push, { subscription: subscription });
    } else {
      push = DI.push.create({
        // @ts-ignore
        user: userId,
        subscription: subscription,
        deviceId: deviceId,
      });
    }

    await DI.push.save(push);
  }
}