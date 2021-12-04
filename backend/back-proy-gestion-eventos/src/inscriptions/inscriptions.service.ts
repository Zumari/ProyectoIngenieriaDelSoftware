import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        if(!scheduledEvent) throw new NotFoundException('No existe este ScheduledEvent') 
        const user=this.usersService.findOne(body.idUser)
        if(!user) throw new NotFoundException('No existe este user') 
        const newInscription = this.inscriptionRepository.create(body)
        return await this.inscriptionRepository.save(newInscription);
    }


    async getOneInscription(ID){
        const inscription = await this.inscriptionRepository.findOne(ID)
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return inscription
    }
    async deleteInscription(id){
        const inscription=await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return this.inscriptionRepository.delete(id)

    }
    async updateInscription(id,body){
        const inscription = await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción');
        const editInscription =Object.assign(inscription,body);
        return await this.inscriptionRepository.save(editInscription);
        
    }

}
