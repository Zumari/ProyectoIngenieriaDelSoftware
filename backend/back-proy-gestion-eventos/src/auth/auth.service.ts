import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from './JWT/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(email: string, pass: string): Promise<boolean> {
        const user = await this.usersService.findUserAuth(email);
        if(!user)throw new NotFoundException("datos no validos");
        
        return await user.validatePassword(pass);
      }
    
      async generateAccessToken(email: string) {
        const user = await this.usersService.findUserAuth(email);
        if(!user)throw new NotFoundException("datos no validos");
        
        const payload: JWTPayload = { email: user.email,firstName:user.firstName };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
