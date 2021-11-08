import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  eventosLista : Event[]=[{
    name:'',
    description:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true
   
  }]; //Arreglo de eventos para recorrer y pintar el html con NGFOR
  constructor(private eventServ: EventsService) { }

    ngOnInit(): void {
      this.getEvents()
    }
  

  getEvents(){
    this.eventServ.getAllEvents().subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)
              
    )
  }
 

}
