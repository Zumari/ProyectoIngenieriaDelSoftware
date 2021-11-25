import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
/* componenetes */
import { Event } from 'src/app/interfaces/event';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';

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

  event: any = {
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
  };
 

  inst: any ={
    institutionId:0,
    name:''
  }
  constructor(private eventServ: EventsService, 
     private activatedRoute:ActivatedRoute,
     private institutionService: InstitutionService,
     private router: Router ) { }

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
  }

  deleteEvent(idEvento:number){
    this.eventServ.deleteEvent(this.event.eventId).subscribe(
      res=>{
        
        this.router.navigate(['mis-eventos']); 
      },
      error=> console.log(error)
      
    )
  }  

  getEvent(id:number){

    this.eventServ.getEvent(id).subscribe(
      res =>  {
        this.event=res;
        this.institutionService.getInstitution(this.event.institutionId).subscribe(
          res =>  {this.event.institutionId=res.name},
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
}
