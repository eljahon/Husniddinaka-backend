import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'technical_language' })
export class Technical_languageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
