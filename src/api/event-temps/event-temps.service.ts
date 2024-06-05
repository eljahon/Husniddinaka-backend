import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventTempDto } from './dto/create-event-temp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, ILike } from 'typeorm';
import { EventTempEntity } from './entities/event-temp.entity';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';
import { EventCategoriesService } from '../event-categories/event-categories.service';
import { UserEntity } from '../users/entities/user.entity';
import { EventTempQueryDto } from './dto/event-temp.query.dto';

@Injectable()
export class EventTempsService {
  constructor(
    @InjectRepository(EventTempEntity)
    private readonly repository: Repository<EventTempEntity>,
    private readonly eventCategoriesService: EventCategoriesService,
  ) {}

  async create(
    user: UserEntity,
    createEventTempDto: CreateEventTempDto,
  ): Promise<EventTempEntity> {
    const oldEventTemp = await this.repository.findOne({
      where: { title: createEventTempDto.title, user: { id: user.id } },
    });
    const eventCategory = await this.eventCategoriesService.findOne(
      createEventTempDto.eventCategory,
    );
    if (!eventCategory) {
      throw new BadRequestException('Event category not found');
    }
    if (oldEventTemp) {
      throw new BadRequestException('Event template already exists');
    }

    const data = {
      ...createEventTempDto,
      user,
      eventCategory,
    };
    const eventTemp = this.repository.create(data);
    return this.repository.save(eventTemp);
  }

  async findAll(
    user: UserEntity,
    query: PaginationDto,
    queryDto: EventTempQueryDto,
  ): Promise<PaginationResult<EventTempEntity>> {
    const options: FindManyOptions = {
      order: { [query.orderBy]: query.sortBy },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      relations: ['eventCategory'],
      where: {
        user: { id: user.id },
        title: ILike(`%${queryDto.title}%`),
        eventCategory: { id: queryDto.eventCategory },
      },
    };

    const [data, total]: any = await this.repository.findAndCount(options);
    return {
      data,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        pageCount: Math.ceil(total / query.pageSize),
        total,
      },
    };
  }

  async findOne(user: UserEntity, id: number) {
    return await this.repository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async update(
    user: UserEntity,
    id: number,
    updateEventTempDto: CreateEventTempDto,
  ) {
    const oldEventTemp = await this.repository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!oldEventTemp) {
      throw new BadRequestException('Event template not found');
    }
    const eventCategory = await this.eventCategoriesService.findOne(
      updateEventTempDto.eventCategory,
    );
    if (!eventCategory) {
      throw new BadRequestException('Event category not found');
    }
    const data = {
      ...updateEventTempDto,
      user,
      eventCategory,
    };
    await this.repository.update(id, data);
    return await this.repository.findOne({
      where: { id },
    });
  }

  async remove(user: UserEntity, id: number) {
    const deleted = await this.repository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!deleted) {
      throw new BadRequestException('Event template not found');
    }
    await this.repository.delete(id);
    return deleted;
  }

  async updateDuration(id: number, duration: number) {
    const eventTemp = await this.repository.findOne({
      where: { id },
    });
    const totalDuration = duration + +eventTemp.totalDuration;
    await this.repository.update(id, { totalDuration });
  }

  async updateClicks(id: number, clicks: number) {
    const totalClicks = clicks + 1;
    await this.repository.update(id, { totalClicks });
  }
}
