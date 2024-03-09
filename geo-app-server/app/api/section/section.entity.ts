import { Topic } from "./topic/topic.entity";
import { BaseEntity } from "../_common/base.entity";
import { Entity, OneToMany, Column } from "typeorm";

@Entity()
export class Section extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Topic, t => t.section)
  topics: Topic[]
}
