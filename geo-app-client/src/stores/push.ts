import { httpClient } from "@/adapters/httpClient";
import { defineStore } from "pinia";
import dictionary from '@/dictionary.json'

export const usePush = defineStore('push', () => {

    function init() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/push/swPush.js').then(registration => {
                // Запрашиваем разрешение на получение уведомлений
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        subscribePush(registration)
                    }
                });
            });
        }
    }

    async function unregister() {
        if ('serviceWorker' in navigator) {
            // Отключение существующих сервис-воркеров для администраторов
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            } catch (error) {
                console.error('Failed to unregister service workers:', error);
            }
        }
    }

    async function subscribePush(registration: ServiceWorkerRegistration) {
        try {
            const publicKey = await getVapidKey();
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey
            })
            await postSubsription(subscription)
        } catch (e: any) {
            console.error('Failed to subscribe user:', e);
        }

    }

    async function getVapidKey() {
        try {
            const data = await httpClient.request<undefined, { publicKey: string }>({
                url: '/push/vapid-key'
            })
            return data.publicKey;
        } catch {
            return Promise.reject(false)
        }
    }

    function generateDeviceId() {

        const genDeviceId = () => {
            const userAgent = window.navigator.userAgent;
            const platform = window.navigator.platform;
            const timestamp = Date.now();

            return `${userAgent}-${platform}-${timestamp}`;
        };

        const lsDeviceId = localStorage.getItem(dictionary.localStorageDeviceIdKey);

        if (lsDeviceId) {
            return lsDeviceId;
        } else {
            const deviceId = genDeviceId();
            localStorage.setItem(dictionary.localStorageDeviceIdKey, deviceId);
            return deviceId;
        }
    }

    async function postSubsription(subscription: PushSubscription) {
        try {
            await httpClient.request<{}, undefined>({
                url: '/push/subscription',
                method: 'POST',
                data: {
                    subscription,
                    deviceId: generateDeviceId()
                }
            })
        } catch { }
    }


    return {
        init,
        unregister
    }

})