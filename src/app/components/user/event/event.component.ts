import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { param } from 'jquery';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';
import { EventsService } from 'src/app/services/user/events/events.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { InstitutionService  } from "../../../services/institutions/institutions.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  faPlus = faPlusCircle;
  faTrash = faTrash;
  event: any = {
    name: '',
    startDate: '',
    endDate: '',
    places :'',
    modality:'',
    statusId:'',
    institutionId: '',
    description_: '',
    userId: '',
    startTime: '',
    endTime: '',
    image: ''
  };

  eventosProgramados: ScheduledEvent[]=[{
    scheduledEventId: 0,
    name:'Conferencia',
    description_: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: '',
    modality:'',
    statusId:0,
    managerId:'',
    eventId:0,
    address: ''
   },
   {
    scheduledEventId: 1,
    name:'Taller',
    description_: 'sssssadada',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: '',
    modality:'',
    statusId:0,
    managerId:'',
    eventId:0,
    address: ''
   },
   {
    scheduledEventId: 2,
    name:'Conffff',
    description_: 'dads',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: '',
    modality:'',
    statusId:0,
    managerId:'',
    eventId:0,
    address: ''
   },
  ]

  inst: any ={
    institutionId:0,
    name:''
  }
  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private schEvent: ScheduledEventService,
     private router: Router
     ) { }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
    this.getAllScheduledEvents();
  }

  getEvent(id:number){

    this.eventServ.getEvent(id).subscribe(
      res =>  {
        this.event=res;
        this.institutionService.getInstitution(this.event.institutionId).subscribe(
          res =>  {this.event.institutionId=res.name},
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  getAllScheduledEvents(){
    this.schEvent.getAllScheduledEvents().subscribe(
      res =>  {this.eventosProgramados=res},
      error => console.log(error)
    )
  }

  goToProfile(id: String) {
    this.router.navigate(['/usuario/perfil-publico/'+ id]);
  }
  
}
