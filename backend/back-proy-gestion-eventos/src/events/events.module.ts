import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { StatusModule } from 'src/status/status.module';
import { StatusService } from 'src/status/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]),InstitutionsModule,StatusModule],
  controllers: [EventsController],
  providers: [EventsService,InstitutionsService,StatusService],
  exports:[TypeOrmModule, EventsService,]
})
export class EventsModule {}
