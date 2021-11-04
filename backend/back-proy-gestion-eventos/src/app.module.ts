import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Users} from './users/Entities/user.entity';
import { InstitutionsController } from './institutions/institutions.controller';
import { InstitutionsModule } from './institutions/institutions.module';
import { InstitutionsService } from './institutions/institutions.service';
import { StatusModule } from './status/status.module';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'KEJ',
    password: '4321',
    database: 'EventServe',
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
  }),UsersModule,InstitutionsModule,StatusModule
],
  controllers: [AppController, UsersController,InstitutionsController,StatusController],
  providers: [AppService, UsersService,InstitutionsService,StatusService],
})
export class AppModule {
 // constructor(private connection: Connection) {}
}
