import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { Technical_languageModule } from './api/technical_language/technical_language.module';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './api/users/entities/user.entity';
import { Technical_languageEntity } from './api/technical_language/entities/technical_language.entity';

// import { EventCategoriesModule } from './api/event-categories/event-categories.module';
// import { EventTempsModule } from './api/event-temps/event-temps.module';
// import { EventsModule } from './api/events/events.module';
// import { EventCategoryEntity } from './api/event-categories/entities/event-category.entity';
// import { EventEntity } from './api/events/entities/event.entity';
// import { EventTempEntity } from './api/event-temps/entities/event-temp.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, Technical_languageEntity],
      synchronize: true,
    }),
    UsersModule,
    Technical_languageModule,
    AuthModule,
  ],
})
export class AppModule {}
