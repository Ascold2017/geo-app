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

export interface BaseTopicPayload {
    title: string;
    text: string;
    videoId: string;
    isPremium: boolean;
    sectionId: number;
    order: number;
}

export interface ParsedTopic extends BaseTopic {
    section: BaseSection
}