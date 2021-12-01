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
  typeEvent: string = 'conferencia';
  mode: string = 'virtual';
  privacy: string = 'publico';

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


  eventoProgramadoForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    startHour: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
    places:  new FormControl(0, [ Validators.min(0)]),
    modality: new FormControl('', Validators.required),
    managerId: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    address: new FormControl('', Validators.required)
  },{validators:dateValidator } )


  public fechaMinima: Date;
  public fechaStrMinima:string ;
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
      this.getEvent(params.name)
    }
    this.getAllScheduledEvents();
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
    this.schEvent.createScheduledEvent(this.eventoProgramadoForm.value).subscribe(
      res =>  {console.log(res)},
      error=> alert(error.error.message))
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

  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }

}
