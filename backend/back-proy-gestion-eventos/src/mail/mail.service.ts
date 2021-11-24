import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,private userService:UsersService) {}
  
    async sendUserPassword(emailUser:string) {
      const user=this.userService.findUserAuth(emailUser)
      const  name=(await user).firstName;
      await this.mailerService.sendMail({
        to: emailUser,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Recuperacion de Contraseña',
        template: './sendPassword', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
          name: name,
          url:`http://localhost:4200/restaurar-contrasenia/:${emailUser}`
        },
      });
    }
}
