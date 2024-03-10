import { useAppModel } from "@app/model";
import { useSectionsModel } from "@entities/sections";
import { AppModal } from "@shared";
import { useEffect, useState } from "react";

export function UserOnboardingModal() {
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);
    const { sections, getSections } = useSectionsModel()
    const changeSection = useAppModel(s => s.changeSection)
    const isAuth = useAppModel(s => s.isAuth)
    const user = useAppModel(s => s.user)
    async function selectSection(sectionId: number) {
        changeSection(sectionId)
        setIsShowOnboarding(false)
    }

    useEffect(() => {
        if (isAuth) {
            getSections();
            if (!user.currentSectionId) {
                setIsShowOnboarding(true);
            }
        }
    }, [user, getSections, isAuth])

    return (
        <AppModal value={isShowOnboarding}>
            <div className="app-title-3 text-center mb-3">Выберите секцию, которую хотите изучить</div>
            {sections.map(section => <button className="btn block w-full mb-3" key={section.id} onClick={() => selectSection(section.id)}>{section.title}</button>)}
        </AppModal>
    )
}