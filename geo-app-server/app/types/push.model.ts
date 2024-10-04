import { PushSubscription } from "web-push"

export interface PostSubscriptionPayload {
    subscription: PushSubscription
    deviceId: string
}