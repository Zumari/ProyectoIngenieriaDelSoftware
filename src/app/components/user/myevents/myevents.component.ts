import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';



@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;

  eventosLista : any[]=[ {
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
  }];

  public usuarioId= this.generalUserService.getEmail();
  
  constructor(
    private generalUserService:GeneralUserService,
    private eventServ:EventsService) { }

  ngOnInit(): void {

    this.getEventsForUser();
  }


  getEventsForUser(){
    this.eventServ.getEventsForUser(this.usuarioId).subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }


}
