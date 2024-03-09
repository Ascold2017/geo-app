
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

  
  export interface TopicsModelState {
    topics: BaseTopic[];
    loading: boolean;
    getTopics: () => Promise<void>;
    deleteTopic: (id: number) => Promise<void>;

    topic: BaseTopic;
   
    isNew: boolean;
    getTopic: (id: number) => Promise<void>;
    setTopicValue: (field: string, value: unknown) => void;
    saveTopic: () => Promise<number>;
    
  }