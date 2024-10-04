import { TaskTypes } from "../entities/task.entity";

export interface PostSectionPayload { title: string; imageUrl: string }

export interface PostTopicPayload {
    title: string;
    text: string;
    videoId: string;
    sectionId: number;
    isPremium: boolean;
    order: number;
  }

  export interface PostTaskPaylad {
    ka: string;
    ru: string;
    transcription: string;
    imageUrl: string;
    soundUrl: string;
    type: TaskTypes;
  }