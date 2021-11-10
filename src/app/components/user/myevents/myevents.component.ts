import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;

  eventosLista : Event[]=[{
    image: '',
    name:'',
    description:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true,
    institutionRepresenting: 0,
    modalidad: 'virtual'
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
