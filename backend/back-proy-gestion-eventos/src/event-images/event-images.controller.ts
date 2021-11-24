import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { eventImagesDto } from './DTO/event-images.dto';
import { EventImagesService } from './event-images.service';

@Controller('event-images')
export class EventImagesController {
    constructor(private eventimagesService: EventImagesService){}
    
    @Get('getImage/:imageId')
    async getOneImage(@Param('imageId') imageId:Number){
        return await this.eventimagesService.getOneImage(imageId);
        
    }
    //DEBERIA SER "ADD IMAGE" PERO POR ESTANDARIZAR dejé create
    @Post('createImage')
    async createImage(@Body() body:eventImagesDto){
        return await this.eventimagesService.createImage(body)
        
    }

    @Get('getAll')
    async getAllImages(){
      return await this.eventimagesService.findAllImages()  
    }

    @Delete('deleteImage/:imageId')
    async deleteImage(@Param('imageId') imageId:Number){
        return await this.eventimagesService.deleteImage(imageId);
    }

    @Put('updateImage/:imageId')
    async updateImage(@Param('imageId') imageId:Number,@Body() body:eventImagesDto){
      return await this.eventimagesService.updateImage(imageId,body)  ;
    }
}