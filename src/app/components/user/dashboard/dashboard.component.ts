import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faPlusCube = faPlus;
  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  mode: string = 'virtual';
  privacy: string = 'publico';


  eventosLista : Event[]=[{
    eventId:0,
    image: '',
    name:'',
    description_:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true,
    institutionId: 0,
    statusId:0,
    userId:0,
    modality:'',
  }]; //Arreglo de eventos para recorrer y pintar el html con NGFOR

  eventoForm = new FormGroup({
    photo : new FormControl(''),
    name: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    places:  new FormControl('', [Validators.required]),
    openEvent:  new FormControl(true, [Validators.required]),
    institutionId: new FormControl(0,[Validators.required, Validators.min(0)]),
    modality: new FormControl('', Validators.required)
  })

  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];


  constructor(private eventServ: EventsService, 
    private institutionServ: InstitutionService, 
    private router: Router,
    private generalService: GeneralUserService) { }

    ngOnInit(): void {
      this.getEvents()
      this.getInstitution()

    }


get photo (){
  return this.eventoForm.get('photo');
}
get name(){
  return this.eventoForm.get('name');
}
get description_(){
  return this.eventoForm.get('description_');
}
get startDate(){
  return this.eventoForm.get('startDate');
}
get endDate(){
  return this.eventoForm.get('endDate');
}
get places(){
  return this.eventoForm.get('places');
}
get openEvent(){
  return this.eventoForm.get('openEvent');
} 
get institutionId(){
  return this.eventoForm.get('institutionId');
}
get modality(){
  return this.eventoForm.get('modality');
}

  createEvents(){
    this.eventoForm.value.institutionId=Number(this.eventoForm.value.institutionId)
    console.log(this.eventoForm.value);
    this.eventServ.createEvent(this.eventoForm.value,this.generalService.getEmail()).subscribe(
      res =>  {console.log(res)},
      error => console.log(error))
    this.router.initialNavigation; 

  }  

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {this.institutions=res},
      error => console.log(error)
      

    )
  }


  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  viewEvent(id: number) {
    this.router.navigate(['usuario/evento/'+id]);
  }
}
