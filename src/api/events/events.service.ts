import { BadRequestException, Injectable } from '@nestjs/common';
import { StartEventDto } from './dto/start-event.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';
import { EventEntity } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { UserEntity } from '../users/entities/user.entity';
import { EventTempsService } from '../event-temps/event-temps.service';
import { StopEventDto } from './dto/stop-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
    private readonly eventTempService: EventTempsService,
  ) {}

  async active(user: UserEntity): Promise<any> {
    const event = await this.repository.findOne({
      where: { user: { id: user.id }, end: null, processing: true },
      relations: ['eventTemp'],
    });
    return {
      data: event || null,
    };
  }

  async serverTime() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return { time: dayjs().tz('Asia/Tashkent').format('HH:mm:ss YYYY-MM-DD') };
  }

  async start(user: UserEntity, startDto: StartEventDto): Promise<EventEntity> {
    // dayjs.extend(utc);
    // dayjs.extend(timezone);
    // const now = dayjs().tz('Asia/Tashkent').format('YYYY-MM-DD HH:mm:ss');

    const eventTemp = await this.eventTempService.findOne(startDto.eventTemp);

    if (!eventTemp) {
      throw new BadRequestException('Event template not found');
    }

    const runningEvent = await this.repository.findOne({
      where: { user: { id: user.id }, end: null, processing: true },
    });
    if (runningEvent) {
      throw new BadRequestException(
        `#${runningEvent.id} - Event already running`,
      );
    }

    const data = {
      user: user,
      serverStart: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      start: startDto.start,
      eventTemp,
    };
    const event = this.repository.create(data);
    return this.repository.save(event);
  }

  async stop(user: UserEntity, stopDto: StopEventDto) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const now = dayjs().tz('Asia/Tashkent').format('YYYY-MM-DD HH:mm:ss');
    const runningEvent: EventEntity = await this.repository.findOne({
      where: { user: { id: user.id }, processing: true },
      relations: { eventTemp: true },
    });

    if (!runningEvent) {
      throw new BadRequestException('No running event found');
    }

    const data = {
      ...runningEvent,
      eventTemp: runningEvent.eventTemp,
      serverEnd: now,
      end: stopDto.end,
      processing: false,
      duration: dayjs(stopDto.end).diff(runningEvent.start, 'second'),
    };
    await this.repository.update(runningEvent.id, data);
    await this.eventTempService.updateDuration(
      runningEvent.eventTemp.id,
      data.duration,
    );
    return await this.repository.findOne({
      where: { id: runningEvent.id },
    });
  }

  async findAll(
    user: any,
    query: PaginationDto,
  ): Promise<PaginationResult<EventEntity>> {
    const options: FindManyOptions = {
      order: { [query.orderBy]: query.sortBy },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      relations: {
        eventTemp: true
      },
      where: {
        user: { id: user.id },
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

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
