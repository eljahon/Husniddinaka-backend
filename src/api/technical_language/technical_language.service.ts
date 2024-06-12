import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technical_languageEntity } from './entities/technical_language.entity';
import { Repository } from 'typeorm';
import { CreateTechDto } from './dto/technical_lang.dto';
interface ITECHNICAL {
  id: number;
  name: string;
  created_at: string;
}
@Injectable()
export class Technical_languageService {
  constructor(
    @InjectRepository(Technical_languageEntity)
    private readonly repository: Repository<Technical_languageEntity>,
  ) {}

  async create(data: CreateTechDto): Promise<any> {
    // if (!name) {
    //   throw new BadRequestException('name is requerd');
    // }

    return await this.repository.save(data);
  }

  async update(name: string): Promise<Technical_languageEntity> {
    return await this.repository.findOne({
      where: { name },
    });
  }

  async findAll(): Promise<Technical_languageEntity[]> {
    return this.repository.find({
      relations: [],
    });
  }

  async findOne(id: number): Promise<Technical_languageEntity> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
