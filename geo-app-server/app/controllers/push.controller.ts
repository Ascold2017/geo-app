import { Body, Controller, Get, Post, Request, Response } from "@decorators/express";
import { PushSubscription } from "web-push";
import { Access } from "../middlewares/Access";
import { UserRoles } from "../entities/user.entity";
import { PushService } from "../services/push.service";
import { LearnService } from "../services/learn.service";

@Controller('/push')
export class PushController {

    constructor(private pushService = new PushService(), private learnService = new LearnService()) { }

    @Get('/vapid-key')
    async getVapidKey(@Response() res) {
        res.json({ publicKey: process.env.VAPID_PUBLIC_KEY })
    }


    @Access([UserRoles.USER])
    @Post('/subscription')
    async postSubscription(@Request() req, @Response() res, @Body() body: { subscription: PushSubscription, deviceId: string }) {
        const userId = req.state.user.id
        await this.pushService.savePushSubscription(userId, body.subscription, body.deviceId);
        
        const shouldRepeat = this.learnService.checkIsShouldRepeatForUser(userId);
        if (shouldRepeat) {
            this.pushService.sendNotificationByUserId(
                null,
                "Привет :) Пора потренироваться!",
            );
        }

        res.json({ ok: true });

    }
}