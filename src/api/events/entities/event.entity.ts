import { Column, PrimaryGeneratedColumn } from "typeorm";

export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ default: false })
  processing: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
