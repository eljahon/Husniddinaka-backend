import { Injectable } from '@nestjs/common';
import { CreateEventTempDto } from './dto/create-event-temp.dto';
import { UpdateEventTempDto } from './dto/update-event-temp.dto';

@Injectable()
export class EventTempsService {
  create(createEventTempDto: CreateEventTempDto) {
    return 'This action adds a new eventTemp';
  }

  findAll() {
    return `This action returns all eventTemps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventTemp`;
  }

  update(id: number, updateEventTempDto: UpdateEventTempDto) {
    return `This action updates a #${id} eventTemp`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventTemp`;
  }
}
