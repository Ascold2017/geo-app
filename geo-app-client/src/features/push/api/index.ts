import { axiosInstance } from "@shared"

export const getVapidKeyRequest = async () => (await axiosInstance<{ publicKey: string }>({ url: '/push/vapid-key' })).data

export const postSubscriptionRequest = async (deviceId: string, subscription: PushSubscriptionJSON) => (await axiosInstance({
    url: '/push/subscribe',
    method: 'POST',
    data: {
        subscription,
        deviceId
    }
})).data