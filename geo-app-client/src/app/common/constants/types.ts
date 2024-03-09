export interface BaseSection {
  id: number;
  title: string;
  imageUrl?: string
}

export interface UserSection extends BaseSection {}

export interface BaseTopic {
  id: number;
  title: string;
  text?: string;
  videoId: string;
  isPremium: boolean;
  sectionId: number;
}

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

export interface BaseTopicWithTasks extends BaseTopic {
  tasks: BaseTask[]
}

export interface UserTopic extends BaseTopic {
  completed: boolean;
  progress: number;
}

export interface UserTask extends BaseTask {
  repeated: number;
  isCompleted: boolean;
  nextRepeat: number;
}

export interface UserTopicWithTasks extends UserTopic {
  tasks: UserTask[]
}


export interface BaseUser {
  id: number;
  username: string;
  isPremium: boolean;
  registeredAt: Date;
  currentSectionId?: number;
}

export interface User extends BaseUser {
  token: string;
  role: 'user' | 'admin';
}


