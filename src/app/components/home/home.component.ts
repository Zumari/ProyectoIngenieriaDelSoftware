import { Component, OnInit } from '@angular/core';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faBookmark = faBookmark;
  faLock = faLock;
  eventosLista : Event[]=[]; //Arreglo de eventos para recorrer y pintar el html con NGFOR
  eventos: any = [{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  }];
  constructor(private eventServ: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }
 

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.events=res},
      error => console.log(error)
              
    )
  }

}
