import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ScheduledEvent } from './Entities/scheduledEvent.entity';
import { ScheduledEventController } from './scheduled-event.controller';
import { ScheduledEventService } from './scheduled-event.service';

@Module({imports:[TypeOrmModule.forFeature([ScheduledEvent]),UsersModule,InstitutionsModule,],
    controllers: [ScheduledEventController],
    providers: [ScheduledEventService,UsersService,InstitutionsService,],
    exports:[ScheduledEventService,TypeOrmModule]})
export class ScheduledEventModule {}
