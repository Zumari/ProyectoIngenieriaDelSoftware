import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users_ } from './Entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports:[TypeOrmModule.forFeature([Users_])],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
