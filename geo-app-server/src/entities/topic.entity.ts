
import { BaseEntity } from "./base.entity";
import { Task } from "./task.entity";
import { Section } from "./section.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Topic extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ nullable: true })
  text?: string;

  @ManyToOne(() => Section, { onDelete: 'CASCADE', nullable: false })
  section: Section;

  @Column({ nullable: true })
  videoId?: string;

  @Column({ type: 'boolean' })
  isPremium = false;

  @Column({ type: 'numeric', default: -1 })
  order: -1;

  @OneToMany(() => Task, t => t.topic)
  tasks: Task[];
}
