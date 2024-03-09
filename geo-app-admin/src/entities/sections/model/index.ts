import _ from 'lodash';
import { create } from 'zustand'
import { deleteSection, getSections, patchSection, postSection } from '../api'
import { SectionsModelState } from './index.d';


export const useSectionsModel = create<SectionsModelState>((set, get) => ({
    sections: [],
    loading: false,
    getSections: async () => {
        set({ loading: true })
        const sections = await getSections();
        set({ sections, loading: false })
    },
    deleteSection: async (id: number) => {
        set({ loading: true })
        await deleteSection(id)
        set({ loading: false })
        get().getSections();
    },
    saveSection: async (section) => {     
        set({ loading: true })
        if (section.id === 0) {
            await postSection(_.omit(section, 'id'));
        } else {
            await patchSection(section.id, section);
        }
        set({ loading: false })
        get().getSections();
    }
}))
