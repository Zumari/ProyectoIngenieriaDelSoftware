import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ScheduledEventDTO } from './DTO/scheduledEvent.dto';
import { ScheduledEventService } from './scheduled-event.service';

@Controller('scheduled-event')
export class ScheduledEventController {
    constructor(private scheduledEventService: ScheduledEventService){}
    
    @Get('getScheduledEvent/:scheduledEventId')
    async getOneScheduledEvent(@Param('scheduledEventId') scheduledEventId:string){
        return await this.scheduledEventService.getOneScheduledEvent(scheduledEventId);
        
    }

    @Post('createScheduledEvent')
    async createScheduledEvent(@Body() body:ScheduledEventDTO){
        return await this.scheduledEventService.createScheduledEvent(body)
        
    }

    @Get('getAll')
    async getAllScheduledEvents(){
      return await this.scheduledEventService.findAllScheduledEvents()  
    }

    @Delete('deleteScheduledEvent/:scheduledEventId')
    async deleteScheduledEvent(@Param('scheduledEventId') scheduledEventId:string){
        return await this.scheduledEventService.deleteScheduledEvent(scheduledEventId);
    }

    @Put('updateScheduledEvent/:scheduledEventId')
    async updateScheduledEvent(@Param('scheduledEventId') scheduledEventId:string,@Body() body:ScheduledEventDTO){
      return await this.scheduledEventService.updateScheduledEvent(scheduledEventId,body)  ;
    }
}