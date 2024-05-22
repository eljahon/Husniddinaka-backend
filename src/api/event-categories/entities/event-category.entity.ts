import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'eventCategories' })
export class EventCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
