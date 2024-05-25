import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventTempEntity } from '../../event-temps/entities/event-temp.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time with time zone' })
  start: Date;

  @Column({ type: 'time with time zone', nullable: true })
  end: Date;

  @Column({ type: 'time with time zone' })
  serverStart: Date;

  @Column({ type: 'time with time zone', nullable: true })
  serverEnd: Date;

  @Column({ default: true })
  processing: boolean;

  @Column({ default: 0 })
  duration: number;

  @ManyToOne(() => EventTempEntity, (eventTemp) => eventTemp.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  eventTemp: EventTempEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  parentEvent: EventEntity;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
