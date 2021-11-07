import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JWT/jwt.strategy';


@Module({
  imports:[ConfigModule.forRoot(),PassportModule,UsersModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}

