import type { UserTask } from "./task.model";

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
