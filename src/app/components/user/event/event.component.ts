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
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {


  faPlus = faPlusCircle;
  faTrash = faTrash;
  devolver=false;
  urls: any = [];
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

  urlImage: string="";
  nameImage="";
  uploadPercent:Observable<number|undefined> | undefined;
  inscriptions:Inscription[]=[]


  eventosProgramados: ScheduledEvent[]=[]

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
     private router: Router,
     private storage: AngularFireStorage
     ) {this.getInscriptions()}

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
    this.getAllScheduledEvents(params.name);
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

  uploadImage(inputname: string) {
    const id = Math.random().toString(36).substring(2);
    var input: any = document.getElementById(inputname);
    const file = input.files[0];
    const ruta = `upload/${id}`;
    const ref = this.storage.ref(ruta);

    const carga = this.storage.upload(ruta, file);
    this.uploadPercent = carga.percentageChanges();
    carga.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.urlImage=url;
          //Aqui deben mandar a guardar la url
          console.log(url)
          console.log(this.urlImage);
        });
      })
    ).subscribe();
   }


  getAllScheduledEvents(idEvent:number){
    this.schEvent.getAllScheduledEventsWhere(idEvent).subscribe(
      res =>  {
      this.eventosProgramados=res},
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
      nameUser:this.generalUserService.getNombreUsuario(),
    }

    this.insc.createInscription(inscription).subscribe(
       res =>  {alert(res.message)},
      error=> alert(error.error.message)
      )
  }

  deleteInscription(idScheduledEventF:number){
    this.insc.deleteInscription(idScheduledEventF,this.generalUserService.getEmail()).subscribe(
       res =>  {alert(res.message)},
      error=> alert(error.error.message)
    )
  }

  /*getOneInscription(){
    this.insc.getOneInscription().subscribe(
      res =>  {this.inscript=res},
      error=> alert(error.error.message)
    )
  }*/

  getInscriptions(){
    this.insc.getInscriptions().subscribe(
      res =>  {this.inscriptions=res,console.log(res)},
      error=> alert(error.error.message)
    )
  }

  getExist(idSheduleEvent:number){
    console.log("id de evento y email",idSheduleEvent,this.generalUserService.getEmail());
    this.inscriptions.forEach(element=>{
      if(element.idScheduledEvent==idSheduleEvent && element.idUser==this.generalUserService.getEmail()){
        console.log("coincidio");
        this.devolver=true;
      }
    })
    return this.devolver;
  }



}
