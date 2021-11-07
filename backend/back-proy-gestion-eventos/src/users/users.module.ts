import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Repository } from 'typeorm';
import { Users} from './Entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    controllers:[UsersController],
    providers:[UsersService,InstitutionsService,],
    exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
