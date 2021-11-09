import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { StatusModule } from 'src/status/status.module';
import { StatusService } from 'src/status/status.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), InstitutionsModule, StatusModule, UsersModule],
  controllers: [EventsController],
  providers: [EventsService, InstitutionsService, StatusService, UsersService],
  exports:[TypeOrmModule, EventsService]
})
export class EventsModule {}
