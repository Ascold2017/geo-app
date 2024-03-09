import { BaseEntity } from "../../_common/base.entity";
import { User } from "../user.entity";
import { Task } from "../../section/topic/task/task.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Progress extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false, })
  user: User;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task;

  @Column({ default: 0 })
  repeated: number;

  @Column({ default: false })
  isCompleted: boolean = false;

  @Column({ default: new Date().getTime(), type: 'bigint' })
  nextRepeat: number;
}
