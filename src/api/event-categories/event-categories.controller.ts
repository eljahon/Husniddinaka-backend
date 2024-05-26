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
  Req,
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
  @RoleEnabled('admin', 'user')
  async create(
    @Req() req,
    @Body() createEventCategoryDto: CreateEventCategoryDto,
  ) {
    return await this.eventCategoriesService.create(
      req.user,
      createEventCategoryDto,
    );
  }

  @Get()
  @ApiBearerAuth()
  @RoleEnabled('admin', 'user')
  async findAll(
    @Req() req,
    @Query() paginationQuery: PaginationDto,
  ): Promise<PaginationResult<EventCategoryEntity>> {
    return await this.eventCategoriesService.findAll(req.user, paginationQuery);
  }

  @Put(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin', 'user')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ): Promise<EventCategoryEntity> {
    return await this.eventCategoriesService.update(
      req.user,
      +id,
      updateEventCategoryDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin', 'user')
  remove(@Req() req, @Param('id') id: string) {
    return this.eventCategoriesService.remove(req.user, +id);
  }
}
