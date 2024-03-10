import {create} from 'zustand';
import { getVapidKeyRequest, postSubscriptionRequest } from "../api";

interface PushState {
    subscription: PushSubscriptionJSON | null;
    setSubscription: (subscription: PushSubscriptionJSON | null) => void;
    subscribePush: (swReg: ServiceWorkerRegistration) => Promise<void>;
    postPushSubscription: () => Promise<void>;
    getDeviceId: () => string;
}

export const usePushStore = create<PushState>((set, get) => ({
    subscription: null,
    setSubscription: (subscription) => set({ subscription }),
    subscribePush: async (swReg) => {
        
        const { publicKey } = await getVapidKeyRequest();
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
        await postSubscriptionRequest(get().getDeviceId(), subscription);
    },
    getDeviceId: () => {
        const genDeviceId = () => {
          const userAgent = window.navigator.userAgent;
          const platform = window.navigator.platform;
          const timestamp = Date.now();
          
          return `${userAgent}-${platform}-${timestamp}`;
        };
        const lsDeviceId = localStorage.getItem('device-id');
        if (lsDeviceId) {
          return lsDeviceId;
        } else {
          const deviceId = genDeviceId();
          localStorage.setItem('device-id', deviceId);
          return deviceId;
        }
      }
}));
