import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventCategoryEntity } from '../../event-categories/entities/event-category.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'eventTemps' })
export class EventTempEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 0 })
  totalDuration: number;

  @Column({ default: 0 })
  totalClicks: number;

  @ManyToOne(() => EventCategoryEntity, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  eventCategory: EventCategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
