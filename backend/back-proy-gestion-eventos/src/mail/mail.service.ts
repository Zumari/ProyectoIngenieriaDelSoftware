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
          url:`http://localhost:4200/restaurar-contrasenia/${emailUser}`
        },
      });
    }

    async sendCharge(emailCharge:string,
      nameOrganizer:string,
      nameCharge:string,
      nameEvent:string,
      emailOrganizer:string,startDate:string,endDate:string,startHour:string,endHour:string,modality:string) {
      await this.mailerService.sendMail({
        to: emailCharge,
        subject: 'Encargado de evento',
        template: './notifyInCharge', 
        context: { 
          name: nameCharge,
          nameOrganizer:nameOrganizer,
          nameEvent:nameEvent,
          emailOrganizer:emailOrganizer,
          startDate:startDate,
          endDate:endDate,
          startHour:startHour,
          endHour:endHour,
          modality:modality
        },
      });
    }
}
