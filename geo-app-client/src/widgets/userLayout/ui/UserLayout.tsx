import { useNavigate, Outlet } from "react-router-dom";
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { CommentOutlined, RiseOutlined, SettingFilled, TableOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { useConfirmStore } from "@widgets/appConfirm";
import { AppDropdown, AppMenu, AppMenuItem, AppSpin, AUTH_PATH, PRACTICE_PATH, PROGRESS_PATH, TOPICS_PATH } from "@shared";
import { useAppModel } from "@app/model";
import { SelectSection, UserOnboardingModal } from "@widgets/userOnboarding";

export function UserLayout() {
    const navigate = useNavigate();
    const auth = useAppModel();
    
    const { openConfirm } = useConfirmStore();

    useMount(() => init());

    async function init() {
        const isAuth = await auth.getCurrentUser()
        if (!isAuth) {
            location.href = AUTH_PATH
        }
    }

   
    function onLogout() {
        openConfirm({
            title: 'Выход',
            text: 'Вы уверены, что хотите выйти?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                auth.logout()
                navigate(AUTH_PATH)
            }
        })
    }

    const menuList: AppMenuItem[] = [
        { title: 'Темы', link: TOPICS_PATH, icon: <TableOutlined /> },
        { title: 'Практика', link: PRACTICE_PATH, icon: <CommentOutlined /> },
        { title: 'Прогресс', link: PROGRESS_PATH, icon: <RiseOutlined /> },
    ];

    const renderDropdownMenu = () => {
        return <div className="card w-56 bg-base-100 px-3 py-3 z-10">
            <div className="app-text-2 text-white">Пользователь: {auth.user.username}</div>
            <div className="app-text-2 text-white mb-3">Аккаунт: {auth.user.isPremium ? 'Premium' : 'Обычный'}</div>
            <SelectSection />
            <div className="divider" />
            <button onClick={onLogout} className="btn btn-error block w-full">Выйти</button>
        </div>
    }
    return (<>
        <header className="navbar bg-primary text-white">

            <BrowserView className="flex items-center w-full" >
                <img src={'/favicon-32x32.png'} className="block mr-3"></img>
                <h2 className="app-title-2">GEO App</h2>
                <AppMenu items={menuList} className="flex-1" />

                <AppDropdown
                    activator={<SettingFilled />}
                >
                    {renderDropdownMenu()}
                </AppDropdown>

            </BrowserView>

            <MobileView className="flex items-center w-full">
                <img src={'/favicon-32x32.png'} className="block mr-3"></img>
                <h2 className="app-title-2">GEO App</h2>
                <span className="ml-auto"></span>

                <AppDropdown
                    activator={<SettingFilled />}
                >
                    {renderDropdownMenu()}
                </AppDropdown>
            </MobileView>

        </header>

        <main className={`container mx-auto py-3 px-3 ${isMobile && 'py-16'}`}>
            {auth.user.token ? <Outlet /> : <AppSpin spinning />}

            <UserOnboardingModal />
        </main>
        <MobileView className="navbar navbar-center bg-primary text-white fixed bottom-0 justify-center">
            <AppMenu mobile items={menuList} />
        </MobileView>
    </>)
}
