/* eslint-disable react-hooks/rules-of-hooks */
import {create} from 'zustand';
import { useChangeUserSection } from "@api/users";
import { useGetSections } from "@api/sections";
import { UserSection } from "@common/constants/types";
import useAuthService from '@app/auth/stores/auth';

interface SectionsState {
    sections: UserSection[];
    getSections: () => Promise<void>;
    changeSection: (sectionId: number) => Promise<void>;
}

export const useSections = create<SectionsState>((set) => ({
    sections: [],
    getSections: async () => {
        
        const getSectionsReq = useGetSections();
        const data = await getSectionsReq();
        set({ sections: data });
    },
    changeSection: async (sectionId: number) => {
        const getCurrentUser = useAuthService.getState().getCurrentUser
        const changeUserSectionReq = useChangeUserSection();
        await changeUserSectionReq(sectionId);
        await getCurrentUser();
    },
}));
