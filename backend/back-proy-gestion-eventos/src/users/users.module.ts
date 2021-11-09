import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Repository } from 'typeorm';
import { Users} from './Entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports:[TypeOrmModule.forFeature([Users]),InstitutionsModule, EventsModule],
    controllers:[UsersController],
    providers:[UsersService,InstitutionsService, EventsService],
    exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
