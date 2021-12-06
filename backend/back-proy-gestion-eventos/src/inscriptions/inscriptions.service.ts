import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledEventDTO } from 'src/scheduled-event/DTO/scheduledEvent.dto';
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
        private usersService: UsersService){}
    
    
    async findAllInscriptions(): Promise<Inscriptions[]>{
        return await this.inscriptionRepository.find();
    }
    async createInscription(body){

        const scheduledEvent=this.scheduledEventService.getOneScheduledEvent(body.idScheduledEvent)
        if((await scheduledEvent).places==0){
            return {
                "message":`Lo sentimos, ya no hay cupos para este evento :)`
           }
        }
        const newInscription = this.inscriptionRepository.create(body)
        await this.inscriptionRepository.save(newInscription);
        this.scheduledEventService.updateScheduledEventPlaces((await scheduledEvent).scheduledEventId)
        
        return  {
             "message":`Inscripcíon correcta`
              
        }
        
    }

    async getOneInscription(idSE,idU){
        const inscription = await this.inscriptionRepository.findOne({idScheduledEvent:idSE,idUser:idU})
        if(!inscription){
            return false
        }else{
            return true
        }
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
