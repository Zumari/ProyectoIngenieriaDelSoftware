import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { Event } from 'src/app/interfaces/event';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.scss']
})
export class MyeventComponent implements OnInit {

  faPlus = faPlusCircle;
  faEye = faEye;
  faAsterisk = faCertificate;
  faTrash = faTrash;
  public fechaMinima: Date;
  public fechaStrMinima:string ;
  mode: string = 'virtual';
  typeEvent: string = 'conferencia';
  privacy: string = 'publico';

  conferenciaForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    openEvent:  new FormControl(true, [Validators.required]),
    modality: new FormControl('', Validators.required)
  },{validators:dateValidator})

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
    startHour: '',
    endHour: '',
    image: ''
  };


  eventosProgramados: ScheduledEvent[]=[{
    scheduledEventId: 0,
    name:'',
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
   }
  ]


  inst: any ={
    institutionId:0,
    name:''
  }
  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private schEvent : ScheduledEventService,
    private pipe:DatePipe,
     private router: Router ) {

      this.fechaMinima= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.fechaMinima, "yyyy-MM-dd")!;
     }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
  }

  deleteEvent(idEvento:number){
    this.eventServ.deleteEvent(idEvento).subscribe(
      res=>{
        console.log(res);

      },
      error=> console.log(error)

    )
    this.router.navigate(['usuario/mis-eventos']);
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

  deleteScheduledEvent(idEvento:number){
    this.schEvent.deleteScheduledEvent(idEvento).subscribe(
      res=>{
        console.log(res);
        this.getAllScheduledEvents();

      },
      error=> console.log(error)

    )

  }

  get name(){
    return this.conferenciaForm.get('name');
  }
  get description_(){
    return this.conferenciaForm.get('description_');
  }
  get startDate(){
    return this.conferenciaForm.get('startDate');
  }
  get endDate(){
    return this.conferenciaForm.get('endDate');
  }
  get places(){
    return this.conferenciaForm.get('places');
  }
  get openEvent(){
    return this.conferenciaForm.get('openEvent');
  }
  get institutionId(){
    return this.conferenciaForm.get('institutionId');
  }
  get modality(){
    return this.conferenciaForm.get('modality');
  }

  createEvents() {
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }
}
