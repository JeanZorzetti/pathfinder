import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentLibrary } from './entities/content-library.entity';
import { User } from '../users/entities/user.entity';
import { ContentLibraryService } from './content-library.service';
import { ContentLibraryController } from './content-library.controller';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentLibrary, User]),
    GamificationModule,
  ],
  providers: [ContentLibraryService],
  controllers: [ContentLibraryController],
  exports: [ContentLibraryService],
})
export class ContentLibraryModule {}
