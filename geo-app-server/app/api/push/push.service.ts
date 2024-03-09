import WebPush from "web-push";
import { DI } from "../../main";

export const sendNotificationById = async (id: number, message: string) => {
  const subs = await DI.push.findBy({
    user: { id },
    isSendedNotification: false,
  });
  
  subs.forEach(async (sub) => {
    WebPush.sendNotification(sub.subscription, message);
    DI.push.merge(sub, { isSendedNotification: true })
    await DI.push.save(sub);
  })

};

export const uncheckRecieveNotification = async (id: number) => {
  const subs = await DI.push.findBy({ user: { id } });
  subs.forEach(async (sub) => {
    DI.push.merge(sub, { isSendedNotification: false })
    await DI.push.save(sub);
  })
};
