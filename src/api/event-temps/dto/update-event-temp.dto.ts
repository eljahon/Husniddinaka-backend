import { PartialType } from '@nestjs/swagger';
import { CreateEventTempDto } from './create-event-temp.dto';

export class UpdateEventTempDto extends PartialType(CreateEventTempDto) {}
