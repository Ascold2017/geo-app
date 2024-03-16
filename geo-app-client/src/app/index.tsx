import { useMount } from 'ahooks'
import { RouterProvider } from 'react-router-dom';
import { Notifications, useNotificationModel } from '@features/notifications';
import { usePushModel, register } from '@features/push';
import { ConfirmModal } from '@features/confirm';
import './styles.css';
import { router } from '@pages/index';
import { Suspense } from 'react';

export function App() {
    const showNotification = useNotificationModel(s => s.showNotification);
    const { subscribePush } = usePushModel();
    useMount(() => {
        register({
            async onRegister(registration) {
                subscribePush(registration)
            },
            onUpdate() {
                showNotification({ message: 'Доступно обновление! Закройте приложение и откройте снова.', duration: 10000, type: 'info' })
            }
        });
    });

    return <>
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>

        <Notifications />
        <ConfirmModal />
    </>
}

