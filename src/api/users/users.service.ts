import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, Like, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { IQuery } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    console.log(data);
    return await this.repository.save(data as unknown as UserEntity);
    // if (data.password !== data.rePassword) {
    //   throw new BadRequestException('Passwords do not match');
    // }
    // const oldUser = await this.findByUsername(data.username);
    //
    // if (oldUser) {
    //   throw new BadRequestException('Username already exists');
    // }
    //
    // data.password = await hashGenerator(data.password);
    // const user = this.repository.create(data);
    // return await this.repository.save(data);
  }

  async update(data: CreateUserDto, id: number) {
    await this.repository.update(id, data as unknown as UserEntity);
    return this.repository.findOne({ where: { id } });
  }

  async findByUsername(
    first_name: string,
    phone_number: string,
  ): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { phone_number, first_name },
    });
  }

  async findAll(query: IQuery): Promise<UserEntity[]> {
    let where:any = {};
    console.log(query);
    if (query?.search) {
      // where['first_name'] = Like(`%${query.search}%`);
      // where['last_name'] = Like(`%${query.search}%`);
      where['phone_number'] = Like(`%${query.search}%`);
      // console.log(where);
    }
    return await this.repository.find({
      relations: [],
      where,
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
