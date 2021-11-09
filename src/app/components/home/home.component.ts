import { Component, OnInit } from '@angular/core';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { institution } from 'src/app/interfaces/institution';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faBookmark = faBookmark;
  faLock = faLock;
  eventosLista : Event[]=[{
    image: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    places: 0,
    openEvent: true,
  modalidad: 'virtual'}]; //Arreglo de eventos para recorrer y pintar el html con NGFOR


  eventos: any = [{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  },{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  },{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  },{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  },{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  }];

  //Para recorrer y llenar el select-list de instituciones
  institutions: institution[]=[];

loginForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.pattern('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i')]),
  firstName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
  password_: new FormControl('',[Validators.required, Validators.minLength(5)]),
  middleName  : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
  lastname : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
  secondLastName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
  academicTraining  : new FormControl('',[Validators.required]),
  description_ : new FormControl('',[Validators.required]),
  interests : new FormControl('',[Validators.required]),
  institutionRepresenting :new FormControl('',[Validators.required])
});
  constructor(private eventServ: EventsService, private generalUserService:GeneralUserService, private institutionServ:InstitutionService) { }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }


  CreateUser(){
    this.generalUserService.createUser(this.loginForm.value).subscribe(
      res => {console.log(res)
      },
      err =>console.log(err)
    )
  }


  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {this.institutions=res},
      error => console.log(error)

    )
  }


}
