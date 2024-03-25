import { TaskDTO, UserTaskDTO } from "./task.dto";
import { Progress } from "../entities/progress.entity";

export class ProgressListDTO {
  public nextRepeat?: number;
  public tasks: TaskDTO[];
  constructor(progress: Progress[], nextRepeat?: number) {
    this.tasks = progress.map((ps) => new UserTaskDTO({ ...ps.task, progress: [ps] }));
    this.nextRepeat = nextRepeat;
  }
}
