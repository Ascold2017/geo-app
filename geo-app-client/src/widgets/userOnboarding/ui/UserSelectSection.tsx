import { useAppModel } from "@app/model";
import { useSectionsModel } from "@entities/sections";
import { AppSelect } from "@shared";

export function SelectSection() {
    const user = useAppModel(s => s.user)
    const { sections } = useSectionsModel();
    const changeSection = useAppModel(s => s.changeSection);

    return (<AppSelect value={user.currentSectionId}
        onChange={(id) => changeSection(+id)}
        items={sections.map(s => ({ title: s.title, value: s.id }))}
    />)
}