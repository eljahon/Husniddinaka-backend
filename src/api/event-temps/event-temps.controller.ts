import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { EventTempsService } from './event-temps.service';
import { CreateEventTempDto } from './dto/create-event-temp.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';
import { EventTempEntity } from './entities/event-temp.entity';
import { RoleEnabled } from '../../decorators/accessRole.decorator';

@Controller('event-temps')
@ApiTags('event-temps')
export class EventTempsController {
  constructor(private readonly eventTempsService: EventTempsService) {}

  @Post()
  @ApiBearerAuth()
  @RoleEnabled('user')
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Req() req, @Body() createEventTempDto: CreateEventTempDto) {
    return this.eventTempsService.create(req.user, createEventTempDto);
  }

  @Get()
  @ApiBearerAuth()
  @RoleEnabled('user')
  async findAll(
    @Req() req,
    @Query() paginationQuery: PaginationDto,
  ): Promise<PaginationResult<EventTempEntity>> {
    return await this.eventTempsService.findAll(req.user, paginationQuery);
  }

  @Put(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateEventTempDto: CreateEventTempDto,
  ) {
    return this.eventTempsService.update(req.user, +id, updateEventTempDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RoleEnabled('admin')
  async remove(@Param('id') id: string) {
    return await this.eventTempsService.remove(+id);
  }
}
