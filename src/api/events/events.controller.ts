import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StartEventDto } from './dto/start-event.dto';
import { StopEventDto } from './dto/stop-event.dto';
import { RoleEnabled } from '../../decorators/accessRole.decorator';
import { PaginationDto, PaginationResult } from '../../commons/pagination.dto';
import { EventEntity } from './entities/event.entity';
import { SwapEventDto } from "./dto/swap-event.dto";

@Controller('events')
@ApiTags('events')
@ApiBearerAuth()
@RoleEnabled('user')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('time')
  async serverTime() {
    return await this.eventsService.serverTime();
  }

  @Get('active-event')
  async activeEvent(@Req() req) {
    return await this.eventsService.active(req.user);
  }

  @Post('start')
  async startEvent(@Req() req, @Body() startDto: StartEventDto) {
    return await this.eventsService.start(req.user, startDto);
  }

  @Post('stop')
  async stopEvent(@Req() req, @Body() stopDto: StopEventDto) {
    return await this.eventsService.stop(req.user, stopDto);
  }

  // @Post('swap')
  // async swapEvent(@Req() req, @Body() swapDto: SwapEventDto) {
  //   return await this.eventsService.swap(req.user, swapDto);
  // }

  @Get()
  async findAll(
    @Req() req,
    @Query() paginationQuery: PaginationDto,
  ): Promise<PaginationResult<EventEntity>> {
    return await this.eventsService.findAll(req.user, paginationQuery);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
