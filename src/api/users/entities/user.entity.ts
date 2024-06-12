import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Gender, Marital_Status, Language_list } from '../../../enums';
import { Technical_languageEntity } from '../../technical_language/entities/technical_language.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  age: number;
  @ManyToOne(() => Technical_languageEntity, (Technical) => Technical.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  technical_language_id: UserEntity;

  @Column({ nullable: true })
  bad_habits: string;

  @Column({ nullable: true })
  contacts: string;

  @Column({ nullable: true })
  addres: string;

  @Column({ nullable: true })
  registration_addres: string;

  @Column({ nullable: true })
  current_addres: string;

  @Column({ nullable: true })
  current_position: string;

  @Column({ nullable: true })
  acdemic_rank: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  acdemic_degree: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  graduted: string;

  @Column({ nullable: true })
  habits: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  birth_place: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  marital_status: Marital_Status;

  @Column({ nullable: true })
  language_list: Language_list;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
