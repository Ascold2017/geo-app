
import { BaseEntity } from "../../../_common/base.entity";
import { Topic } from "../topic.entity";
import { Progress } from "../../../user/progress/progress.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum TaskTypes {
  LETTER = "letter",
  WORD = "word",
  SENTENCE = "sentence",
}

@Entity()
export class Task extends BaseEntity {
  @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
  topic: Topic;

  @Column({ default: TaskTypes.WORD })
  type: TaskTypes;

  @Column()
  ka: string;

  @Column()
  ru: string;

  @Column()
  transcription: string;

  @Column()
  soundUrl: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Progress, p => p.task)
  progress: Progress[];
}
