export interface BaseSection {
    id: number;
    title: string;
    imageUrl?: string
}

export interface SectionsModelState {
    sections: BaseSection[];
    loading: boolean;
    getSections: () => Promise<void>;
    deleteSection: (id: number) => Promise<void>;
    saveSection: (section: BaseSection) => Promise<void>;
}