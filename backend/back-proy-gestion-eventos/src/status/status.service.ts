import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './Entities/status.entity';


@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly StatusRepository: Repository<Status>){}
    async findAllStatus(): Promise<Status[]>{
        return await this.StatusRepository.find();
    }
    
    async createStatus(body){
        const newstatus = this.StatusRepository.create(body)
        return await this.StatusRepository.save(newstatus);
    }
    async getOneStatus(ID){
        const status = await this.StatusRepository.findOne(ID)
        if(!status) throw new NotFoundException('No se econtraron coincidencias')
        return status
    }
    async deleteStatus(id){
        const status=await this.StatusRepository.findOne(id);
        if(!status) throw new NotFoundException('No se econtraron coincidencias')
        return this.StatusRepository.delete(id)

    }
    async updateStatus(id,body){
        const status = await this.StatusRepository.findOne(id);
        if(!status) throw new NotFoundException('No se encontraron coincidencias');
        const editstatus =Object.assign(status,body);
        return await this.StatusRepository.save(editstatus);
        
    }
}