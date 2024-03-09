import {create} from 'zustand';
import { useGetVapidKeyRequest, usePostSubscriptionRequest } from "@api/push";
import { useUpdate } from './update';

interface PushState {
    subscription: PushSubscriptionJSON | null;
    setSubscription: (subscription: PushSubscriptionJSON | null) => void;
    subscribePush: (swReg: ServiceWorkerRegistration) => Promise<void>;
    postPushSubscription: () => Promise<void>;
}

export const usePush = create<PushState>((set, get) => ({
    subscription: null,
    setSubscription: (subscription) => set({ subscription }),
    subscribePush: async (swReg) => {
        
        const getVapidKeyReq = useGetVapidKeyRequest();
        const { publicKey } = await getVapidKeyReq();
        const sub = await swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        });
        get().setSubscription(sub.toJSON());
        /*
        if (authService.isAuth.get()) {
            get().postPushSubscription();
            return;
        }
        authService.user.subscribe((user) => {
            if (user.token) {
                get().postPushSubscription();
            }
        });
        */
    },
    postPushSubscription: async () => {
        const { subscription } = get();
        if (!subscription) return;
        const postSubscriptionReq = usePostSubscriptionRequest();
        const getDeviceId = useUpdate.getState().getDeviceId
        await postSubscriptionReq(getDeviceId(), subscription);
    }
}));
