import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import {DashboardComponent} from 'src/app/components/user/dashboard/dashboard.component'
import {MyeventsComponent} from 'src/app/components/user/myevents/myevents.component'
import { HomeComponent } from '../../home/home.component';
import { Event } from 'src/app/interfaces/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.scss']
})
export class MyeventComponent implements OnInit {

  faPlus = faPlusCircle;
  faEye = faEye;
  faAsterisk = faCertificate;
  faTrash = faTrash;

  evento: any={ 
    eventId:0,
    name:'',
    description_:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true,
    modality:'',
    photo: '',
    institutionId: 0,
    statusId:0,
    userId:0,
    
  }
 


  constructor(private eventServ: EventsService, 
    private dashboard: DashboardComponent,
    private myEvents: MyeventsComponent,
    private home: HomeComponent,
    private router: Router ) { }

  ngOnInit(): void {
  }

  deleteEvent(idEvento:number){
    this.eventServ.deleteEvent(this.evento.eventId).subscribe(
      res=>{
        
        this.router.navigate(['mis-eventos']); 
      },
      error=> console.log(error)
      
    )
  }  

  getOneEvent(){}

}
