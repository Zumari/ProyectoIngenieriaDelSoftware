import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institutions } from 'src/institutions/Entities/Institutions.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Repository } from 'typeorm';
import { ScheduledEventDTO } from './DTO/scheduledEvent.dto';
import { ScheduledEvent } from './Entities/scheduledEvent.entity';
import { UsersService } from "./../users/users.service";

@Injectable()
export class ScheduledEventService {
    constructor(
        @InjectRepository(ScheduledEvent)
        private readonly scheduledEventRepository: Repository<ScheduledEvent>,
        private usersService: UsersService){}
        
    async updateScheduledEvent(scheduledEventId: string, body: ScheduledEventDTO) {
        const scheduledEvent = await this.scheduledEventRepository.findOne(scheduledEventId);
        if(!scheduledEvent) throw new NotFoundException('No se encontraron coincidencias para el evento programado');
        const editedScheduledEvent =Object.assign(scheduledEvent,body);
        return await this.scheduledEventRepository.save(editedScheduledEvent);
    }
    async deleteScheduledEvent(scheduledEventId: string) {
        const scheduledEvent=await this.scheduledEventRepository.findOne(scheduledEventId);
        if(!scheduledEvent) throw new NotFoundException('No se econtraron coincidencias para el evento programado')
        return this.scheduledEventRepository.delete(scheduledEventId)
    }
    async findAllScheduledEvents():Promise <ScheduledEvent[]> {
        return await this.scheduledEventRepository.find();   
    }
    async createScheduledEvent(body: ScheduledEventDTO) {
        //Validar que exista el MANAGER 
        const manager=await this.usersService.findOne(body.managerId)
        if(manager) throw new NotFoundException('No existe ningún usuario con ese correo, no se puede asignar el MANAGER')
        //EN caso de que ya exista un evento programado con ese mismo nombre en la BD para ese evento
        const scheduledEvent=await this.scheduledEventRepository.findOne(body.name);
        if(scheduledEvent) throw new NotFoundException('Ya existe un taller o conferencia con ese nombre')
        const newScheduledEvent= this.scheduledEventRepository.create(body)
        return await this.scheduledEventRepository.save(newScheduledEvent);
    }
    async getOneScheduledEvent(scheduledEventId: string) {
        const scheduledEvent = await this.scheduledEventRepository.findOne(scheduledEventId)
        if(!scheduledEvent) throw new NotFoundException('No se econtraron coincidencias para el evento programado')
        return scheduledEvent
    }
}
