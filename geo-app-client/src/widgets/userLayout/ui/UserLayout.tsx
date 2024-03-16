import { Outlet } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useMount } from "ahooks";
import {AppMenuItem, AppSpin, AUTH_PATH, PRACTICE_PATH, PROGRESS_PATH, TOPICS_PATH } from "@shared";
import { useAuthModel } from "@features/auth";
import { UserLayoutHeader } from "./UserLayoutHeader";
import { TableOutlined, CommentOutlined, RiseOutlined } from "@ant-design/icons";
import { UserLayoutMobileMenu } from "./UserLayoutMobileMenu";
import { SelectSectionModal } from "@features/selectSection";

export function UserLayout() {
    const auth = useAuthModel();

    useMount(() => init());

    async function init() {
        const isAuth = await auth.checkAuth()
        if (!isAuth) {
            location.href = AUTH_PATH
        }
    }

    const menuList: AppMenuItem[] = [
        { title: 'Темы', link: TOPICS_PATH, icon: <TableOutlined /> },
        { title: 'Практика', link: PRACTICE_PATH, icon: <CommentOutlined /> },
        { title: 'Прогресс', link: PROGRESS_PATH, icon: <RiseOutlined /> },
    ];
    
    return (<>
        <UserLayoutHeader menuList={menuList} />

        <main className={`container mx-auto py-3 px-3 ${isMobile && 'py-16'}`}>
            {auth.isAuth ? <Outlet /> : <AppSpin spinning />}
            <SelectSectionModal />
        </main>
        
        <UserLayoutMobileMenu menuList={menuList} />
    </>)
}