import axiosInstance from "../utils/axios"

export const useGetVapidKeyRequest = () => {
    return async () => (await axiosInstance<{ publicKey: string }>({ url: '/push/vapid-key' })).data
}

export const usePostSubscriptionRequest = () => {
    return async (deviceId: string, subscription: PushSubscriptionJSON) => (await axiosInstance({
        url: '/push/subscribe',
        method: 'POST',
        data: {
            subscription,
            deviceId
        }
    })).data
}