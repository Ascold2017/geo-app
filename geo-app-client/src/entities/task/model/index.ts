
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