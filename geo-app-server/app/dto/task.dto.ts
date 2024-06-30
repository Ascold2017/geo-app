import { Task } from "../entities/task.entity"

export class TaskDTO {
  public id: number;
  public ka: string;
  public ru: string;
  public transcription: string;
  public type: string;
  public soundUrl: string;
  public imageUrl: string;
  constructor(task: Task) {
    this.id = task.id;
    this.ka = task.ka;
    this.ru = task.ru;
    this.transcription = task.transcription;
    this.type = task.type;
    this.soundUrl = task.soundUrl;
    this.imageUrl = task.imageUrl;
  }
}

export class UserTaskDTO extends TaskDTO {
  public repeated: number;
  public isCompleted: boolean;
  public nextRepeat: Date | null;
  constructor(task: Task) {
    super(task);
    this.repeated = task.progress[0]?.repeated || 0;
    this.isCompleted = task.progress[0]?.isCompleted || false;
    this.nextRepeat = task.progress[0]?.nextRepeat ? new Date(+task.progress[0].nextRepeat) : null;
  }
}
