import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUser } from './DTO/loginUser.dto';

@Controller('auth')
export class AuthController {
constructor(private authServie:AuthService){}
    @Post('/login')
    async login(@Body() loginDTO: loginUser): Promise<{ access_token: string }> {
     // const { email, password } = loginDTO;
      const valid = await this.authServie.validateUser(loginDTO.email,loginDTO.password);
      if (!valid) {
        throw new UnauthorizedException();
      }
      return await this.authServie.generateAccessToken(loginDTO.email);
    }
}