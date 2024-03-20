import { ServiceSchema } from "moleculer";
import { DI } from "../utils/data-source";
import WebPush from 'web-push'

export default {
    name: 'push',
    actions: {
        async sendNotificationByUserId(ctx) {
            const subs = await DI.push.findBy({
                user: { id: ctx.params.userId },
                isSendedNotification: false,
            });

            subs.forEach(async (sub) => {
                WebPush.sendNotification(sub.subscription, ctx.params.message);
                DI.push.merge(sub, { isSendedNotification: true })
                await DI.push.save(sub);
            })
        },
        async uncheckRecieveNotificationByUserId(ctx) {
            const subs = await DI.push.findBy({ user: { id: ctx.params.userId } });
            subs.forEach(async (sub) => {
                DI.push.merge(sub, { isSendedNotification: false })
                await DI.push.save(sub);
            })
        },
        async saveSubscription(ctx) {
            let push = await DI.push.findOne({ where: { user: { id: ctx.params.userId }, deviceId: ctx.params.deviceId }, relations: { user: true } });
            if (push) {
                DI.push.merge(push, { subscription: ctx.params.subscription })
            } else {
                push = DI.push.create({
                    // @ts-ignore
                    user: userId,
                    subscription: ctx.params.subscription,
                    deviceId: ctx.params.deviceId
                });
            }

            await DI.push.save(push);
        }
    }
} as ServiceSchema