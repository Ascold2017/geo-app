
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

export interface TasksModelState {
    tasks: IntTask[];
    setTasks: ( tasks: IntTask[]) => void;
    markSaveTask: (item: IntTask) => void;
    markDeleteTask: (intId: string) => void;
    saveTasks: (topicId: number) => Promise<void>;
}