import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './api/users/entities/user.entity';
import { EventCategoriesModule } from './api/event-categories/event-categories.module';
import { EventTempsModule } from './api/event-temps/event-temps.module';
import { EventsModule } from './api/events/events.module';
// import { FavoriteEventsModule } from './api/favorite-events/favorite-events.module';
import { EventCategoryEntity } from './api/event-categories/entities/event-category.entity';
import { EventEntity } from './api/events/entities/event.entity';
import { EventTempEntity } from './api/event-temps/entities/event-temp.entity';
// import { FavoriteEventEntity } from './api/favorite-events/entities/favorite-event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'oybek',
      password: '1024',
      database: 'gtm',
      entities: [UserEntity, EventCategoryEntity, EventEntity, EventTempEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EventCategoriesModule,
    EventTempsModule,
    EventsModule,
  ],
})
export class AppModule {}
