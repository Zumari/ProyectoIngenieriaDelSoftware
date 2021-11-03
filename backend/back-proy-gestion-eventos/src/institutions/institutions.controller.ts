import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InstitutionsDto } from './DTO/Institutions.dto';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {

    constructor(private institutionsService: InstitutionsService){}
    
    @Get('getInstitution/:InstitutionId')
    getOneInstitution(@Param('InstitutionId') InstitutionId:string){
        return this.institutionsService.getOneInstitution(InstitutionId);
        
    }

    @Post('createInstitution')
    createInstitution(@Body() body:InstitutionsDto){
        return this.institutionsService.createInstitution(body)
        
    }

    @Get('getAll')
    async getAllInstitutions(){
      return await this.institutionsService.findAllInstitutions()  
    }

    @Delete('deleteInstitution/:InstitutionId')
    deleteIsntitution(@Param('InstitutionId') InstitutionId:string){
        return this.institutionsService.deleteInstitution(InstitutionId);
    }

    @Put('updateInstitution/:InstitutionId')
    updateUser(@Param('InstitutionId') InstitutionId:string,@Body() body:InstitutionsDto){
      return this.institutionsService.updateInstitution(InstitutionId,body)  ;
    }
}