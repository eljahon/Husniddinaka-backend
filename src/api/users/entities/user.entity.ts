import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Gender, Role } from "../../../enums";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: Gender;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'simple-array', default: Role.USER })
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
