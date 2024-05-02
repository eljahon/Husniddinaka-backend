import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashGenerator } from '../../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: RegisterDto) {
    if (data.password !== data.rePassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const oldUser = await this.findByUsername(data.username);

    if (oldUser) {
      throw new BadRequestException('Username already exists');
    }

    data.password = await hashGenerator(data.password);
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
