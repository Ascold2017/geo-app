
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../_common/base.entity";
import { User } from "../user/user.entity";
import { PushSubscription } from "web-push";

@Entity()
export class Push extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: "varchar", unique: true })
  deviceId: string;

  @Column({ type: "json", nullable: true })
  subscription: PushSubscription;

  @Column({ type: 'boolean' })
  isSendedNotification = false;
}
