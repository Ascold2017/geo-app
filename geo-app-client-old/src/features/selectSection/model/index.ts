import { changeUserSection } from "../api";

export const useChangeSection = () => {
    async function changeSection(sectionId: number) {
        const changeUserSectionReq = changeUserSection();
        await changeUserSectionReq(sectionId);
    }

    return { changeSection }
}