import { UserEntity } from '../api/users/entities/user.entity';
// import { EventCategoryEntity } from '../api/event-categories/entities/event-category.entity';
// import { EventEntity } from '../api/events/entities/event.entity';
// import { EventTempEntity } from '../api/event-temps/entities/event-temp.entity';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'Apple',
  password: 'root',
  database: 'users',
  entities: [UserEntity],
  synchronize: true,
};
