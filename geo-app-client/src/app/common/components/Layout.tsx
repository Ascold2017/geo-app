import { useNavigate, Outlet } from "react-router-dom";
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { CommentOutlined, RiseOutlined, SettingFilled, TableOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
//import bgImage from '../assets/bg2.jpg'
import useAuthService from "@app/auth/stores/auth";
import { useSections } from "../stores/sections";
import { AppMenuItem } from "@common/components/ui/AppMenu";
import AppMenu from "@common/components/ui/AppMenu";
import AppDropdown from "@common/components/ui/AppDropdown";
import AppSelect from "@common/components/ui/AppSelect";
import AppModal from "@common/components/ui/AppModal";
import AppSpin from "@common/components/ui/AppSpin";
import { useMount } from "ahooks";
import useConfirmStore from "@common/stores/confirm";
import { AUTH_PATH } from "@app/auth/contstants";
import { PRACTICE_PATH } from "@app/practice/constants";
import { PROGRESS_PATH } from "@app/progress/constants";
import { TOPICS_PATH } from "@app/topic/constants";

export default function BaseLayout() {
    const navigate = useNavigate();
    const auth = useAuthService();
    const sectionsService = useSections()
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);
    const { openConfirm } = useConfirmStore();

    useMount(() => init());

    useEffect(() => {
        if (auth.user.token) {
            sectionsService.getSections();
        }
        if (auth.user.token && !auth.user.currentSectionId) {
            setIsShowOnboarding(true);
        }
    }, [auth.user])

    async function init() {
        const isAuth = await auth.getCurrentUser()
        if (!isAuth) {
            location.href = AUTH_PATH
        }
    }

    async function selectSection(sectionId: number) {
        sectionsService.changeSection(sectionId)
        setIsShowOnboarding(false)
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
            <AppSelect value={auth.user.currentSectionId}
                onChange={(id) => sectionsService.changeSection(+id)}
                items={sectionsService.sections.map(s => ({ title: s.title, value: s.id }))}
            />

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

            <AppModal value={isShowOnboarding}>
                <div className="app-title-3 text-center mb-3">Выберите секцию, которую хотите изучить</div>
                {sectionsService.sections?.map(section => <button className="btn block w-full mb-3" key={section.id} onClick={() => selectSection(section.id)}>{section.title}</button>)}
            </AppModal>
        </main>
        <MobileView className="navbar navbar-center bg-primary text-white fixed bottom-0 justify-center">
            <AppMenu mobile items={menuList} />
        </MobileView>
    </>)
}
