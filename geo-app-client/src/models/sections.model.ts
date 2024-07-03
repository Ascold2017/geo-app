export interface BaseSection {
    id: number;
    title: string;
    imageUrl?: string
}

export interface UserSection extends BaseSection { }

export interface UpdateSectionPayload {
    sectionId: number;
}