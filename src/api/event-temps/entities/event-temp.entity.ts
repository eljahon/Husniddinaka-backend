import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { EventCategoryEntity } from "../../event-categories/entities/event-category.entity";

export class EventTempEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => EventCategoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  eventCategory: EventCategoryEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
