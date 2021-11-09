import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';


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
    image: '',
    name:'',
    description:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true,
    modalidad: 'virtual'
  }]; //Arreglo de eventos para recorrer y pintar el html con NGFOR

  eventoForm = new FormGroup({
    nombreEvento: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    description:new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    places:  new FormControl(0, [Validators.required]),
    openEvent:  new FormControl(true, [Validators.required]),
    institutionRepresenting: new FormControl(0,[Validators.required]),
    modalidad: new FormControl('', Validators.required)
  })

  institutions: institution[]=[{
    institutionID: 0,
    name: 'UNAH'
  },
  {institutionID:1,
  name:'UNITEC'}
  ];


  constructor(private eventServ: EventsService, private institutionServ: InstitutionService) { }

    ngOnInit(): void {
      this.getEvents()
    }

  createEvents(){
    console.log(this.eventoForm.value);
    
    this.eventServ.createEvent(this.eventoForm.value).subscribe(
      res =>  {console.log(res)
      },
      error => console.log(error)
    )
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

  viewEvent(name: string) {
    this.router.navigate(['usuario/evento/:'+name]);
  }
}
