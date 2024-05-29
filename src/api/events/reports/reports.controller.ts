import { Controller, Get, Query, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnabled } from '../../../decorators/accessRole.decorator';
import { DailyReportDto, EventReportDto } from "./reports.dto";

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
@RoleEnabled('user')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('daily')
  async dailyReport(@Req() req, @Query() query: DailyReportDto) {
    return await this.reportService.daily(req.user, query.date);
  }

  @Get('event')
  async eventReport(@Req() req, @Query() query: EventReportDto) {
    return await this.reportService.eventReport(req.user, query);
  }
}
