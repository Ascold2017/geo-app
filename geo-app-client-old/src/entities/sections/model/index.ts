import { create } from "zustand";
import { getSections } from "../api";


export interface BaseSection {
    id: number;
    title: string;
    imageUrl?: string
}

export interface UserSection extends BaseSection { }


interface SectionsModelState {
    loaded: boolean;
    sections: BaseSection[];
    getSectionsOnce: () => Promise<void>;
}
export const useSectionsModel = create<SectionsModelState>((set, get) => ({
    loaded: false,
    sections: [],
    getSectionsOnce: async () => {
        if (get().loaded) return;
        const data = await getSections();
        set({ sections: data, loaded: true });
    }
}));