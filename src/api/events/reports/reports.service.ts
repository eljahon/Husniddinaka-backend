import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as dayjs from 'dayjs';
import { EventReportDto } from './reports.dto';
import { EventTempsService } from '../../event-temps/event-temps.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly eventTempService: EventTempsService,
  ) {}

  async daily(user, day) {
    const today = dayjs().format('YYYY-MM-DD');
    return this.connection
      .query(`select cast(sum(e.duration) as int) as totalDuration, eT.title as eventName from events as e
left join public."eventTemps" eT on e."eventTempId" = eT.id
where e."userId" = ${user.id} and date(e.created_at + interval '5 hours') = '${day || today}'
group by eT.title`);
  }

  async eventReport(user, query: EventReportDto) {
    const eventTemp = await this.eventTempService.findOne(
      user,
      query.eventTempId,
    );

    if (!eventTemp) {
      throw new BadRequestException('Event template not found');
    }

    return this.connection
      .query(`select date(e.created_at + interval '5 hours') as date, cast(sum(e.duration) as int) as totalDuration from events as e
left join public."eventTemps" eT on e."eventTempId" = eT.id
where eT.id = ${eventTemp.id} and e."userId" = ${user.id} and date(e.created_at + interval '5 hours') between '${query.start_date}' and '${query.end_date}'
group by eT.id, date(e.created_at + interval '5 hours');`);
  }
}
