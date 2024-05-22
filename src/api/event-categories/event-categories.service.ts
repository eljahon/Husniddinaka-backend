import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { EventCategoryEntity } from './entities/event-category.entity';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';

@Injectable()
export class EventCategoriesService {
  constructor(
    @InjectRepository(EventCategoryEntity)
    private readonly repository: Repository<EventCategoryEntity>,
  ) {}

  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const oldEventCategory = await this.repository.findOne({
      where: { name: createEventCategoryDto.name },
    });
    console.log(oldEventCategory);
    if (oldEventCategory) {
      throw new BadRequestException('Event category already exists');
    }
    const eventCategory = this.repository.create(createEventCategoryDto);
    return this.repository.save(eventCategory);
  }

  async findAll(
    query: PaginationDto,
  ): Promise<PaginationResult<EventCategoryEntity>> {
    const options: FindManyOptions = {
      order: { [query.orderBy]: query.sortBy },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    };

    const [tasks, total]: any = await this.repository.findAndCount(options);

    return {
      data: tasks,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        pageCount: Math.ceil(total / query.pageSize),
        total,
      },
    };
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateEventCategoryDto: UpdateEventCategoryDto) {
    await this.repository.update(id, updateEventCategoryDto);
    return await this.repository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const deleted = await this.repository.findOne({ where: { id } });
    if (!deleted) {
      throw new BadRequestException('Event template not found');
    }
    await this.repository.delete(id);
    return deleted;
  }
}
