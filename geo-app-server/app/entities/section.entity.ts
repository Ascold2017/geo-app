import { Topic } from "./topic.entity";
import { BaseEntity } from "./base.entity";
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
