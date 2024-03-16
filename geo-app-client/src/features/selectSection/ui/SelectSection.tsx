import { useSectionsModel } from "@entities/sections";
import { AppSelect } from "@shared";
import { useMount } from "ahooks";
import { useChangeSection } from "../model";
import { useUserModel } from "@entities/user";

export function SelectSection() {
    const user = useUserModel(s => s.user)
    const { sections, getSectionsOnce } = useSectionsModel();
    const { changeSection } = useChangeSection();

    useMount(() => {
        getSectionsOnce();
    })

    if (!user) return null;
    return (<AppSelect value={user.currentSectionId}
        onChange={(id) => changeSection(+id)}
        items={sections.map(s => ({ title: s.title, value: s.id }))}
    />)
}