import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { inscriptionsDto } from './DTO/Inscriptions.dto';
import { InscriptionsService } from './inscriptions.service';

@Controller('inscriptions')
export class InscriptionsController {

    constructor(private inscriptionService: InscriptionsService){}
    
    @Get('getInscription/:InscriptionId')
    async getOneInscription(@Param('InscriptionId') InscriptionId:number){
        return await this.inscriptionService.getOneInscription(InscriptionId);
        
    }

    @Post('createInscription')
    async createInscription(@Body() body:inscriptionsDto){
        return await this.inscriptionService.createInscription(body)
        
    }

    @Get('getAll')
    async getAllInscriptions(){
      return await this.inscriptionService.findAllInscriptions()  
    }

    @Delete('deleteInscription/:InscriptionId')
    async deleteInscription(@Param('InscriptionId') InscriptionId:number){
        return await this.inscriptionService.deleteInscription(InscriptionId);
    }

    @Put('updateInscription/:InscriptionId')
    async updateInscription(@Param('InscriptionId') InscriptionId:string,@Body() body:inscriptionsDto){
      return await this.inscriptionService.updateInscription(InscriptionId,body)  ;
    }
}