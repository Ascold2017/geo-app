import type { BaseSection } from "./sections.model";
import type { BaseTask } from "./tasks.model";

export interface BaseTopic {
    id: number;
    title: string;
    text?: string;
    videoId: string;
    isPremium: boolean;
    sectionId: number;
}

export interface BaseTopicWithTasks extends BaseTopic {
    tasks: BaseTask[]
}

export interface ParsedTopic extends BaseTopic {
    section: BaseSection
}