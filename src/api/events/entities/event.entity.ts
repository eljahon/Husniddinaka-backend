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

  @Column()
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @Column()
  serverStart: Date;

  @Column({ nullable: true })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
