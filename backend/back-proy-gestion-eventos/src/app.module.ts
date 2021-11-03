import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Users} from './users/Entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'kevin',
    password: 'Ge1potato1',
    database: 'eventService',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    options: {
      encrypt: true,
      cryptoCredentialsDetails: {// me tiraba error por una version  de tlsv2 que no es compatible con sql server
                                //↑↑↑↑↑ a weno, gracias por la info crack
          minVersion: 'TLSv1'
      }
    },
    extra:{
      trustServerCertificate: true ,
      validateConnection: false,
      IntegratedSecurity: false,
    }
  }),UsersModule
],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {
 // constructor(private connection: Connection) {}
}
