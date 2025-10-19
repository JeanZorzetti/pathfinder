import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { JournalEntry } from './entities/journal-entry.entity';
import { JournalPrompt } from './entities/journal-prompt.entity';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalEntry, JournalPrompt]),
    GamificationModule,
  ],
  controllers: [JournalController],
  providers: [JournalService],
  exports: [JournalService],
})
export class JournalModule {}
