import { useMount } from 'ahooks'
import { RouterProvider } from 'react-router-dom';
import { register } from './servicesWorkerRegistration';
import { AppNotification, useNotificationStore } from '@widgets/appNotifications';
import { usePushStore } from '@widgets/appPush';
import { AppConfirm } from '@widgets/appConfirm';
import './styles.css';
import { router } from '@pages/index';

export function App() {
    const showNotification = useNotificationStore(s => s.showNotification);
    const { subscribePush } = usePushStore();
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
        <RouterProvider router={router} />
        <AppNotification />
        <AppConfirm />
    </>
}

