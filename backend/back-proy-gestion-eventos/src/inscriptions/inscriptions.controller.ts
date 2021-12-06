import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { inscriptionsDto } from './DTO/Inscriptions.dto';
import { InscriptionsService } from './inscriptions.service';

@Controller('inscriptions')
export class InscriptionsController {

    constructor(private inscriptionService: InscriptionsService){}
    

    @Get('getInscription/:idScheduledEventF/:idUserF')
    async getOneInscription(@Param('idScheduledEventF') idScheduledEventF:number,@Param('idUserF') idUserF:string){
        return await this.inscriptionService.getOneInscription(idScheduledEventF,idUserF);
    }
    @Post('createInscription')
    async createInscription(@Body() body:inscriptionsDto){
        return await this.inscriptionService.createInscription(body)
        
    }

    @Get('getAll')
    async getAllInscriptions(){
      return await this.inscriptionService.findAllInscriptions()  
    }

    @Get('getAllByShedEvent/:idScheduledEventF')
    async getAllByShedEvent(@Param('idScheduledEventF') idScheduledEventF : number){
      return await this.inscriptionService.findByShedEvent(idScheduledEventF)
    }

    @Delete('deleteInscription/:idScheduledEventF/:idUserF')
    async deleteInscription(@Param('idScheduledEventF') idScheduledEventF:number,@Param('idUserF') idUserF:string){
        return await this.inscriptionService.deleteInscription(idScheduledEventF,idUserF);
    }

    @Put('updateInscription/:InscriptionId')
    async updateInscription(@Param('InscriptionId') InscriptionId:number,@Body() body:inscriptionsDto){
      return await this.inscriptionService.updateInscription(InscriptionId,body)  ;
    }
}