import { RouterProvider } from 'react-router-dom';
import { Notifications, useNotificationModel } from '@features/notifications';
import { registerPushSw, usePushModel } from '@features/push';
import { ConfirmModal } from '@features/confirm';
import './styles.css';
import { router } from '@pages/index';
import { Suspense } from 'react';
// import { useRegisterSW } from 'virtual:pwa-register/react'

export function App() {
    const showNotification = useNotificationModel(s => s.showNotification);
    const { subscribePush } = usePushModel();
    /*
    useRegisterSW({
        onRegisteredSW(swScriptUrl, registration) {
            registerPushSw();
            subscribePush(registration)
        },
        onNeedRefresh() {
            showNotification({ message: 'Доступно обновление! Закройте приложение и откройте снова.', duration: 10000, type: 'info' })

        },
    })*/

    return <>
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>

        <Notifications />
        <ConfirmModal />
    </>
}

