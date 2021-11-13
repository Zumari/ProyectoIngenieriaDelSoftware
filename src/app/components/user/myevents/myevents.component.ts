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
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
