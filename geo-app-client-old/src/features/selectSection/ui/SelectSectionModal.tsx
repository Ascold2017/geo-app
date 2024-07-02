import { useEffect, useState } from "react";
import { useSectionsModel } from "@entities/sections";
import { useUserModel } from "@entities/user";
import { useAuthModel } from "@features/auth";
import { AppModal } from "@shared";
import { useChangeSection } from "../model";


export function SelectSectionModal() {
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);
    const { sections, getSectionsOnce } = useSectionsModel()
    const { changeSection } = useChangeSection()
    const isAuth = useAuthModel(s => s.isAuth)
    const user = useUserModel(s => s.user)
    async function selectSection(sectionId: number) {
        changeSection(sectionId)
        setIsShowOnboarding(false)
    }

    useEffect(() => {
        if (isAuth) {
            getSectionsOnce();
            if (!user.currentSectionId) {
                setIsShowOnboarding(true);
            }
        }
    }, [user, getSectionsOnce, isAuth])

    return (
        <AppModal value={isShowOnboarding}>
            <div className="app-title-3 text-center mb-3">Выберите секцию, которую хотите изучить</div>
            {sections.map(section => <button className="btn block w-full mb-3" key={section.id} onClick={() => selectSection(section.id)}>{section.title}</button>)}
        </AppModal>
    )
}