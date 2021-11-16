import { Component, OnInit } from '@angular/core';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faBookmark = faBookmark;
  faLock = faLock;
  keyword: string = '';
 eventosLista : Event[]=[{
  eventId:0,
  name: '',
  startDate: '',
  endDate: '',
  places :0,
  modality:'',
  statusId:0,
  institutionId:0,
  openEvent: true,
  description_: '',
  userId: 0,
  image: '',
  }]; //Arreglo de eventos para recorrer y pintar el html con NGFOR


  //Para recorrer y llenar el select-list de instituciones
  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

registerForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
  firstName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  password_: new FormControl('',[Validators.required, Validators.minLength(5)]),
  middleName  : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  lastName : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  secondLastName: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
  academicTraining: new FormControl('',[Validators.required]),
  description_ : new FormControl('',[Validators.required]),
  interests : new FormControl('',[Validators.required]),
  institutionRepresenting :new FormControl(0,[Validators.required, Validators.min(0)])
});

institutionForm = new FormGroup({
  name : new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
});

loginForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),

  password_: new FormControl('',[Validators.required, Validators.minLength(5)])
});

  constructor( private eventServ: EventsService, private generalUserService:GeneralUserService, private institutionServ:InstitutionService, private router:Router) { }

  ngOnInit(): void {
    this.getInstitution();
    this.getEvents();
  }

  //Getters de los formControls de FormGroup loginForm para utilizar validaciones
  get emailLog(){
    return this.loginForm.get('email');
  }


  get passLog(){
    return this.loginForm.get('password_');
  }



//Getters de los formControls de FormGroup registerForm para utilizar validaciones
  get email() {
    return this.registerForm.get('email');
  }


  get firstName() {
    return this.registerForm.get('firstName');
  }

  get middleName() {
    return this.registerForm.get('middleName');
  }


  get lastName() {
    return this.registerForm.get('lastName');
  }

  get secondLastName(){
    return this.registerForm.get('secondLastName');
  }

  get academicTraining(){
    return this.registerForm.get('academicTraining');
  }
   get description_(){
     return this.registerForm.get('description_');
   }
  get interests(){
    return this.registerForm.get('interests');
  }

  get institutionRepresenting(){
    return this.registerForm.get('institutionRepresenting');
  }


  get passReg(){
    return this.registerForm.get('password_');
  }

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  getFilterEvents(typeFilter: string) {
    this.eventServ.getFilterEvents(typeFilter, this.keyword).subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  CreateUser(){
    console.log(this.registerForm.value);
    console.log(this.institutionForm.value);
    const institutionId = this.registerForm.value.institutionRepresenting;

    // Sino se selecciono institución obtener el nombre de la nueva institucion
    if(institutionId == 0){
      this.institutionServ.createInstitution(this.institutionForm.value).subscribe(
        res => {
          console.log(res);
          this.registerForm.value.institutionRepresenting = res.InstitutionID;
          this.generalUserService.createUser(this.registerForm.value).subscribe(
            res => {console.log(res)},
            err =>console.log(err)
          )
        },
        err =>console.log('No se intento crear una institucion')
      )
    }else{
      this.registerForm.value.institutionRepresenting = Number(this.registerForm.value.institutionRepresenting);
      this.generalUserService.createUser(this.registerForm.value).subscribe(
        res => {console.log(res)},
        err =>console.log(err)
      )
    }

    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }


  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {
        this.institutions=res;
      },
      error => console.log(error)

    )
  }



  Onlogin():void{
    console.log(this.loginForm.value);

    this.generalUserService.login(this.loginForm.value)
    .subscribe((res)=>{
      if(res){
        this.router.navigate(['usuario/eventos']);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN
        console.log(res);
      }
    },error=> alert(error.error.message));
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
