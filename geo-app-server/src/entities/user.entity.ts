
import { Progress } from "./progress.entity";
import { BaseEntity } from "./base.entity";
import { Section } from "./section.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Section, { nullable: true, onDelete: 'SET NULL', })
  currentSection: Section;

  @Column({ default: UserRoles.USER, type: 'varchar' })
  role = UserRoles.USER;

  @Column({ default: false })
  isPremium: boolean;

  @OneToMany(() => Progress, p => p.user)
  progress: Progress[]
}
