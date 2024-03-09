import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import { DownloadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import useAuthService from "./stores/auth";
import AppSpin from "@common/components/ui/AppSpin";
import useNotificationStore from "@common/stores/notification";
import { TOPICS_PATH } from "@app/topic/constants";
import { ADMIN_PATH } from "./contstants";

export default function StartPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isApp, setIsApp] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
    const user = useAuthService(s => s.user);
    const isAuth = useAuthService(s => s.isAuth);
    const actions = useAuthService(s => ({ signIn: s.signIn, signUp: s.signUp }))
    const { showNotification } = useNotificationStore();

    const navigate = useNavigate();
    const { loading: loadingSignIn, error: signInError, runAsync: signInRequest, } = useRequest((l, p) => actions.signIn(l, p), { manual: true })
    const { loading: loadingSignUp, error: signUpError, runAsync: signUpRequest } = useRequest((l, p) => actions.signUp(l, p), { manual: true })


    useEffect(() => {
        window.addEventListener('beforeinstallprompt', setDeferredPrompt);
        setIsApp(getPWADisplayMode() !== 'browser')
    }, []);

    useEffect(() => {
        if (signInError) showNotification({ message: signInError.message, type: 'error' })
    }, [signInError]);

    useEffect(() => {
        if (signUpError) showNotification({ message: signUpError.message, type: 'error' })
    }, [signUpError])

    useEffect(() => {
        if (isAuth) {
            user.role === 'admin'
                ? location.href = ADMIN_PATH
                : navigate(TOPICS_PATH)
        }
    }, [isAuth])


    async function signIn(login: string, password: string) {
        await signInRequest(login, password);
        showNotification({ message: 'Вы успешно вошли!', type: 'success' })
    }

    async function signUp(login: string, password: string) {
        await signUpRequest(login, password);
        showNotification({ message: 'Вы успешно зарегистрировались!', type: 'success' })
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

    return <>
        <AppSpin spinning={loadingSignIn || loadingSignUp} />
        {isFlipped
            ? <AuthCard title="Регистрация" isSignUp onFlip={() => setIsFlipped(false)} onSubmit={signUp} />
            : <AuthCard title="Добро пожаловать в GEO App!" onFlip={() => setIsFlipped(true)} onSubmit={signIn} />
        }
        {!isApp &&
            <div className='flex justify-center mt-6'>
                <button className="btn btn-outline" onClick={installApp}><DownloadOutlined /> Установить</button>
            </div>}
    </>
}