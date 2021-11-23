import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventImages } from './entities/event-images.entity';

@Injectable()
export class EventImagesService {
    constructor(
        @InjectRepository(EventImages)
        private readonly eventImagesRepository: Repository<EventImages>){}
    
    
    async findAllImages(): Promise<EventImages[]>{
        return await this.eventImagesRepository.find();
    }
    //ADD IMAGE
    async createImage(body){
        const image=await this.eventImagesRepository.findOne(body);
        if(image) throw new NotFoundException('Ya existe una imagen con la misma direccíon')
        const newImage = this.eventImagesRepository.create(body)
        return await this.eventImagesRepository.save(newImage);
    }
    async getOneImage(ID){
        const image = await this.eventImagesRepository.findOne(ID)
        if(!image) throw new NotFoundException('No se econtraron coincidencias de esta imagen')
        return image
    }
    async deleteImage(id){
        const image=await this.eventImagesRepository.findOne(id);
        if(!image) throw new NotFoundException('No se econtraron coincidencias de esta imagen')
        return this.eventImagesRepository.delete(id)

    }
    //PARA CAMBIAR LA IMAGEN O CAMBIAR EL EVENTO AL QUE PERTENECE
    async updateImage(id,body){
        const image = await this.eventImagesRepository.findOne(id);
        if(!image) throw new NotFoundException('No se encontraron coincidencias de esta imagen');
        const editedImage =Object.assign(image,body);
        return await this.eventImagesRepository.save(editedImage);
        
    }

}
