
export enum TaskTypesEnum {
    LETTER = 'letter',
    WORD = 'word',
    SENTENCE = 'sentence'
}
export interface BaseTask {
    id: number;
    type: TaskTypesEnum;
    ka: string;
    ru: string;
    transcription: string;
    soundUrl?: string;
    imageUrl?: string;
}
export type IntTask = BaseTask & { _intId: string };