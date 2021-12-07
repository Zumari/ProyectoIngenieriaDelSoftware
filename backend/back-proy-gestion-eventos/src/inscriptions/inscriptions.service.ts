import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/events.service';
import { ScheduledEventService } from 'src/scheduled-event/scheduled-event.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Inscriptions } from './Entities/Inscriptions.entity';

@Injectable()
export class InscriptionsService {
    constructor(
        @InjectRepository(Inscriptions)
        private inscriptionRepository: Repository<Inscriptions>,
        private scheduledEventService: ScheduledEventService,
        private usersService: UsersService,
        private eventService:EventsService){}
    
    
    async findAllInscriptions(): Promise<Inscriptions[]>{
        return await this.inscriptionRepository.find();
    }

    async createInscription(body){
        const scheduledEvent=this.scheduledEventService.getOneScheduledEvent(body.idScheduledEvent)
        let existInWhiteList=false;
        if(!scheduledEvent) throw new NotFoundException('No existe este ScheduledEvent') 
        const user=this.usersService.findOne(body.idUser)
        if(!user) throw new NotFoundException('No existe este user') 
        const event=this.eventService.findOneEvent((await scheduledEvent).eventId);
        if(!(await event).listWhite){
            body.nameUser = (await user).firstName + " " + (await user).lastName;
            const newInscription = this.inscriptionRepository.create(body)
            await this.inscriptionRepository.save(newInscription);
            return  {
                 "message":`Inscripcíon correcta`  
            }
        }else{
            const formato =JSON.parse((await event).listWhite);
            formato.forEach(element => {
                if(element.email==body.idUser){
                    existInWhiteList=true;
                }

              });
              if(existInWhiteList){
                body.nameUser = (await user).firstName + " " + (await user).lastName;
                const newInscription = this.inscriptionRepository.create(body)
                await this.inscriptionRepository.save(newInscription);
                return  {
                     "message":`Inscripcíon orrecta`   
                }
              }else{
                return  {
                    "message":`Usuario no tiene permisos para inscribirse en este evento`   
               }
              }
        } 
    }

    async getOneInscription(ID){
        const inscription = await this.inscriptionRepository.findOne(ID)
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return inscription
    }

    async findByShedEvent(idScheduledEventF:number){
        const inscription = await this.inscriptionRepository.find({idScheduledEvent:idScheduledEventF})
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return inscription
    }
    async deleteInscription(idScheduledEventF:number , idUserF:string){
/*         const inscription=await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción') */
        await this.inscriptionRepository.delete({idScheduledEvent:idScheduledEventF,idUser:idUserF})
        return {
            "message":"Inscripción cancelada"
        }

    }
    async updateInscription(id,body){
        const inscription = await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción');
        const editInscription =Object.assign(inscription,body);
        return await this.inscriptionRepository.save(editInscription);
        
    }


}
