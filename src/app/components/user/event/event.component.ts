import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { param } from 'jquery';
import { EventsService } from 'src/app/services/user/events/events.service';
import { InstitutionService  } from "../../../services/institutions/institutions.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  faPlus = faPlusCircle;
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
  constructor(private eventServ: EventsService, private activatedRoute:ActivatedRoute,private institutionService: InstitutionService) { }

  ngOnInit(): void {
    this.getInstitutionName(1)
    console.log(this.inst)
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.getEvent(params.name)
    }
  }

  getEvent(id:number){

    this.eventServ.getEvent(id).subscribe(
      res =>  {
        this.event=res;
/*         this.event.institutionId = this.getInstitutionName(this.event.institutionId);
        console.log(this.inst); */
      },
      error => console.log(error)
    )
  }

  getInstitutionName(id:number){
    this.institutionService.getInstitution(id).subscribe(
      res =>  {
        this.inst=res;
      },
      error => console.log(error)
    );
  }
  
}
