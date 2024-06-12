import { Module } from '@nestjs/common';
import { Technical_languageService } from './technical_language.service';
import { Technical_languageController } from './technical_language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technical_languageEntity } from './entities/technical_language.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Technical_languageEntity]), UsersModule],
  controllers: [Technical_languageController],
  providers: [Technical_languageService],
  exports: [Technical_languageService],
})
export class Technical_languageModule {}
