import { create } from "zustand";
import { getUserTopic, getUserTopics } from "../api";
import { UserTask } from "@entities/task";

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



export interface UserTopicWithTasks extends UserTopic {
    tasks: UserTask[]
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

interface TopicModel {
    topic: UserTopicWithTasks | null;
    getTopic: (id: string) => Promise<void>
}
export const useTopicModel = create<TopicModel>((set) => ({
    topic: null,
    getTopic: async (id) => {
        const data = await getUserTopic(id)
        set({ topic: data })
    }
}))