import {create} from 'zustand';

type NotificationType = 'success' | 'info' | 'error';

type Notification = {
    message: string;
    type: NotificationType;
    duration: number;
};

type NotificationPayload = {message: string, type: NotificationType, duration?: number};

type NotificationStore = {
    notification: Notification | null;
    showNotification: (payload: NotificationPayload) => void;
};

export const useNotificationModel = create<NotificationStore>((set) => ({
    notification: null,
    showNotification: ({ message, type, duration = 3000 }) => {
        const notification: Notification = {
            message,
            type,
            duration,
        };

        set({ notification });

        const t = setTimeout(() => {
            set({ notification: null });
            clearTimeout(t);
        }, duration);
    },
}));