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
import { dateValidator, hourValidator, ValidadoresEspeciales } from 'src/app/util/ValidadorEspecial';
import { DatePipe } from '@angular/common';
import { param } from 'jquery';

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

  eventName: String = '';

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


  eventosProgramados: ScheduledEvent[]=[

  ]


  inst: any ={
    institutionId:0,
    name:''
  }


  eventoProgramadoForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    startHour: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
    places:  new FormControl(undefined, [ Validators.min(0)]),
    modality: new FormControl('', Validators.required),
    managerId: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    address: new FormControl('',Validators.required),
    eventId:new FormControl(0)
  },{validators:dateValidator } )


  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private pipe:DatePipe,
     private schEvent : ScheduledEventService,
     private router: Router ) {

      this.fechaMinima= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.fechaMinima, "yyyy-MM-dd")!;
     }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.eventName = params.name;
      this.getEvent(params.name);
    }
    this.getAllScheduledEvents(params.name);
  }


  get name(){
    return this.eventoProgramadoForm.get('name');
  }
  get description_(){
    return this.eventoProgramadoForm.get('description_');
  }

  get startDate(){
    return this.eventoProgramadoForm.get('startDate');
  }

  get endDate(){
    return this.eventoProgramadoForm.get('endDate');
  }

  get startHour(){
    return this.eventoProgramadoForm.get('startHour');
  }

  get endHour(){
    return this.eventoProgramadoForm.get('endHour');
  }

  get places(){
    return this.eventoProgramadoForm.get('places');
  }

  get modality(){
    return this.eventoProgramadoForm.get('modality');
  }

  get managerId(){
    return this.eventoProgramadoForm.get('managerId');
  }

  get address(){
    return this.eventoProgramadoForm.get('address');
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


  createScheduledEvent(){ 
    this.eventoProgramadoForm.value.eventId=Number(this.activatedRoute.snapshot.params.name)
    this.eventoProgramadoForm.value.startHour=this.eventoProgramadoForm.value.startDate+' '+this.eventoProgramadoForm.value.startHour
    this.eventoProgramadoForm.value.endHour=this.eventoProgramadoForm.value.endDate+' '+this.eventoProgramadoForm.value.endHour
    this.schEvent.createScheduledEvent(this.eventoProgramadoForm.value).subscribe(
      res =>  {console.log(res)},
      error=> alert(error.error.message))
      window.location.reload();
  }


  getAllScheduledEvents(idEvent:number){
    this.schEvent.getAllScheduledEventsWhere(idEvent).subscribe(
      res =>  {this.eventosProgramados=res},
      error => console.log(error)
    )
  }

  deleteScheduledEvent(idEvento:number){
    this.schEvent.deleteScheduledEvent(idEvento).subscribe(
      res=>{
        console.log(res);
        this.getAllScheduledEvents(this.activatedRoute.snapshot.params.name);

      },
      error=> console.log(error)

    )

  }

  createEvents() {
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }

  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  goToParticipants(idScheduledEventF:number) {
    this.router.navigate(['/usuario/mi-evento/'+ this.eventName +'/participants/'+ idScheduledEventF]);
  }

  goToProfile(id: String) {
    this.router.navigate(['/usuario/perfil-publico/'+ id]);
  }

}
