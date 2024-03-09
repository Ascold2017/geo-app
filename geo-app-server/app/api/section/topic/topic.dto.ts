import { Topic } from "./topic.entity";
import { TaskDTO, UserTaskDTO } from "./task/task.dto";
import { Progress } from "../../user/progress/progress.entity";

export class TopicDTO {
  public id: number;
  public title: string;
  public text: string;
  public videoId: string;
  public isPremium: boolean;
  public sectionId: number;
  constructor(topicDocument: Topic) {
    this.id = topicDocument.id;
    this.title = topicDocument.title;
    this.text = topicDocument.text;
    this.videoId = topicDocument.videoId;
    this.isPremium = topicDocument.isPremium || false;
    this.sectionId = topicDocument.section.id;
  }
}

export class TopicWithTasksDTO extends TopicDTO {
  tasks: TaskDTO[];
  constructor(topic: Topic) {
    super(topic);
    this.tasks = topic.tasks.map((task) => new TaskDTO(task));
  }
}

export class UserTopicDTO extends TopicDTO {
  public completed: boolean;
  public progress: number;
  constructor(topic: Topic, progress: Progress[]) {
    super(topic);
    const tasksCount = topic.tasks.length;
    const readedTasksCount = progress.filter(p => p.repeated > 0).length;

    this.progress = ((readedTasksCount / tasksCount) * 100) << 0; // percent of progress
    this.completed = this.progress === 100;
  }
}


export class UserTopicWithTasksDTO extends UserTopicDTO {
  tasks: UserTaskDTO[];
  constructor(topic: Topic, progress: Progress[]) {
    super(topic, progress);
    this.tasks = topic.tasks.map((task) => {
      task.progress = progress.filter(p => p.task.id === task.id)
      return new UserTaskDTO(task);
    });
  }
}
