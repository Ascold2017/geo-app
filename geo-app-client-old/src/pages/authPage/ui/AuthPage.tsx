import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from '@ant-design/icons';

import { AppSpin, TOPICS_PATH, ADMIN_PATH } from "@shared";
import { AuthLayout } from "./AuthLayout";
import { useAuthModel, AuthCard } from "@features/auth";
import { useNotificationModel } from "@features/notifications";
import { useUserModel } from "@entities/user";

export function AuthPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isApp, setIsApp] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
    const { isAuth, signIn, signUp } = useAuthModel()
    const user = useUserModel(s => s.user);
    const { showNotification } = useNotificationModel();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', setDeferredPrompt);
        setIsApp(getPWADisplayMode() !== 'browser')
    }, []);

    useEffect(() => {
        if (isAuth) {
            user.role === 'admin'
                ? location.href = ADMIN_PATH
                : navigate(TOPICS_PATH)
        }
    }, [isAuth, user, navigate])


    async function onSignIn(login: string, password: string) {
        try {
            setLoading(true);
            await signIn(login, password);
            showNotification({ message: 'Вы успешно вошли!', type: 'success' })
        } catch (e) {
            showNotification({ message: e.message, type: 'error' })
        } finally {
            setLoading(false);
        }
    }

    async function onSignUp(login: string, password: string) {
        try {
            setLoading(true);
            await signUp(login, password);
            showNotification({ message: 'Вы успешно зарегистрировались!', type: 'success' })
        } catch (e) {
            showNotification({ message: e.message, type: 'error' })
        } finally {
            setLoading(false);
        }
    }

    async function installApp() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null)
            }
        }
    }

    function getPWADisplayMode() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            return 'twa';
            // @ts-expect-error sds
        } else if (navigator.standalone || isStandalone) {
            return 'standalone';
        }
        return 'browser';
    }

    return <AuthLayout>
        <AppSpin spinning={loading} />
        {isFlipped
            ? <AuthCard title="Регистрация" isSignUp onFlip={() => setIsFlipped(false)} onSubmit={onSignUp} />
            : <AuthCard title="Добро пожаловать в GEO App!" onFlip={() => setIsFlipped(true)} onSubmit={onSignIn} />
        }
        {!isApp &&
            <div className='flex justify-center mt-6'>
                <button className="btn btn-outline" onClick={installApp}><DownloadOutlined /> Установить</button>
            </div>}
    </AuthLayout>
}