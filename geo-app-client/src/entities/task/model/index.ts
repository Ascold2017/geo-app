import { create } from "zustand";
import { postCheckCompleted, postCheckReaded } from "../api";

export enum TaskTypesEnum {
    LETTER = 'letter',
    WORD = 'word',
    SENTENCE = 'sentence'
}

interface BaseTask {
    id: number;
    type: TaskTypesEnum;
    ka: string;
    ru: string;
    transcription: string;
    soundUrl?: string;
    imageUrl?: string;
}

export interface UserTask extends BaseTask {
    repeated: number;
    isCompleted: boolean;
    nextRepeat: number;
}

interface TaskModel {
    checkReaded: (id: number) => Promise<void>;
    checkCompleted: (id: number, value: boolean) => Promise<void>;
}

export const useTaskModel = create<TaskModel>(() => ({
    checkReaded: async (id) => {
        await postCheckReaded(id)
    },
    checkCompleted: async (id, value) => {
        await postCheckCompleted(id, value)
    }
}));