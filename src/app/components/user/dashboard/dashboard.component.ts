import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


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

  constructor(private eventServ: EventsService, private router: Router) { }

    ngOnInit(): void {
      this.getEvents()
    }


  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
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
