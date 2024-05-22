import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';
import { EventCategoryEntity } from './entities/event-category.entity';
import { RoleEnabled } from '../../decorators/accessRole.decorator';

@Controller('event-categories')
@ApiTags('event-categories')
@UseInterceptors(ClassSerializerInterceptor)
export class EventCategoriesController {
  constructor(
    private readonly eventCategoriesService: EventCategoriesService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @RoleEnabled('admin')
  async create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return await this.eventCategoriesService.create(createEventCategoryDto);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationDto,
  ): Promise<PaginationResult<EventCategoryEntity>> {
    return await this.eventCategoriesService.findAll(paginationQuery);
  }

  @Put(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin')
  async update(
    @Param('id') id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ): Promise<EventCategoryEntity> {
    return await this.eventCategoriesService.update(
      +id,
      updateEventCategoryDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin')
  remove(@Param('id') id: string) {
    return this.eventCategoriesService.remove(+id);
  }
}
