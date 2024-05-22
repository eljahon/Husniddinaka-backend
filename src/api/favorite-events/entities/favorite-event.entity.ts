import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { EventTempEntity } from '../../event-temps/entities/event-temp.entity';

@Entity({ name: 'favoriteEvents' })
export class FavoriteEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EventTempEntity, { onDelete: 'CASCADE' })
  eventTemp: EventTempEntity;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}