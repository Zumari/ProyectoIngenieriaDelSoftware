import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Event } from './entities/event.entity';

@Crud({
  model: {
    type: Event 
  }, 
  params: {
    id: {
        field: 'id',
        type: 'number',
        primary: true,
        disabled: true, // <= DESHABILITAR EL ID
    }
  }
})


@Controller('events')
export class EventsController implements CrudController<Event> {
  //constructor(private readonly eventsService: EventsService) {}
  constructor(public service: EventsService) {}

  @Post('/createEvent')
  create(@Body() createEventDto: CreateEventDto) {
    return this.service.create(createEventDto);
  }

  @Get('/getAllEvents')
  findAll() {
    return this.service.findAll();
  }

  @Get('/getOneEventById/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOneId(+id);
  }

  @Patch('/updateEvent/:id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.service.update(+id, updateEventDto);
  }

  @Delete('/deleteEvent/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
