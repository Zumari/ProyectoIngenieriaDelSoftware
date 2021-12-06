import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { param } from 'jquery';
import { ScheduledEvent } from 'src/app/interfaces/scheduled-event';
import { EventsService } from 'src/app/services/user/events/events.service';
import { ScheduledEventService } from 'src/app/services/user/scheduled-event/scheduled-event.service';
import { InstitutionService  } from "../../../services/institutions/institutions.service";
import {Inscription } from 'src/app/interfaces/inscription';
import { CheckInService } from 'src/app/services/check in/check-in.service';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  boton_pulsadoC: boolean=false
  boton_pulsadoI: boolean=true

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

  inscriptions:Inscription={
    idInscription:0,
    idScheduledEvent:0, 
    idUser:'',
    attendance:false
  } 

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
   }  ]

  inst: any ={
    institutionId:0,
    name:''
  }
  constructor(private eventServ: EventsService,
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private schEvent: ScheduledEventService,
     private insc: CheckInService,
     private generalUserService:GeneralUserService,
     private router: Router
     ) { }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
    this.getAllScheduledEvents();
/*     this.getInscriptions(); */
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

  //Métodos de Inscripción
  createInscription(scheduledEventId: number){
    let inscription ={
      idScheduledEvent:scheduledEventId, 
      idUser:this.generalUserService.getEmail(),
    }
    
    this.insc.createInscription(inscription).subscribe(
       res =>  alert(res.message),
      error=> alert(error.error.message)
      )
      this.boton_pulsadoC=true
      this.boton_pulsadoI=false
  }

  deleteInscription(idScheduledEventF:number){
    this.insc.deleteInscription(idScheduledEventF,this.generalUserService.getEmail()).subscribe(
       res =>  alert(res.message),
      error=> alert(error.error.message)
    )
    this.boton_pulsadoC=false
    this.boton_pulsadoI=true
  }

  /*getOneInscription(){
    this.insc.getOneInscription().subscribe(
      res =>  {this.inscript=res},
      error=> alert(error.error.message)
    )
  }*/

  getInscriptions(){
    this.insc.getInscriptions().subscribe(
      res =>  {this.inscriptions=res},
      error=> alert(error.error.message)
    )
  }
   

  
}
