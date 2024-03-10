import { create } from "zustand";
import { getUserTopics } from "../api";

interface BaseTopic {
    id: number;
    title: string;
    text?: string;
    videoId: string;
    isPremium: boolean;
    sectionId: number;
}

export interface UserTopic extends BaseTopic {
    completed: boolean;
    progress: number;
}

interface TopicsModel {
    topics: UserTopic[];
    getTopics: () => Promise<void>;
}

export const useTopicsModel = create<TopicsModel>((set) => ({
    topics: [],
    getTopics: async () => {
        const topics = await getUserTopics();
        set({ topics });
    }
}));
