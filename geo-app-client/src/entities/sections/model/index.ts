import { create } from "zustand";
import { getSections } from "../api";


export interface BaseSection {
    id: number;
    title: string;
    imageUrl?: string
}

export interface UserSection extends BaseSection { }


interface SectionsModelState {
    sections: BaseSection[];
    getSections: () => Promise<void>;
}
export const useSectionsModel = create<SectionsModelState>((set) => ({
    sections: [],
    getSections: async () => {
        const data = await getSections();
        set({ sections: data });
    }
}));