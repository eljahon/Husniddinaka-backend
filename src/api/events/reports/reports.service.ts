import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as dayjs from 'dayjs';
import { EventReportDto } from './reports.dto';
import { EventTempsService } from '../../event-temps/event-temps.service';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly eventTempService: EventTempsService,
  ) {}

  async daily(user: UserEntity, day: Date) {
    const today = dayjs().format('YYYY-MM-DD');
    return await this.connection
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

  async allReportByDay(user) {
    return await this.connection.query(`
       select date(e.start + interval '5 hours'),
       json_agg(
               jsonb_build_object(
                       'eventId', e.id,
                       'templateId', et.id,
                       'title', et.title,
                       'start', e.start,
                       'end', e."end",
                       'duration', extract(epoch from (e.end - e.start))
               )
       )
from events e
         left join "eventTemps" eT on eT.id = e."eventTempId"
where e.start is not null
  and e."end" is not null and e."userId" = ${user.id}
group by date(e.start + interval '5 hours');
      `);
  }
}
