import { Component, OnInit } from '@angular/core';
import { CheckInService } from 'src/app/services/check in/check-in.service';
import { Inscription } from 'src/app/interfaces/inscription';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  mode: boolean = false;

  constructor(
    private checkInService: CheckInService,
    private generalUserService: GeneralUserService,
    private activatedRoute:ActivatedRoute
    ) { }

  updateInscription: any;

  sheduleEventId: any = {
    id: null
  };

  inscription: any = {
    userName: '',
    userId: '',
    attendance: '',
    idInscription: '',
    idScheduledEvent: '',
  };

  inscriptions:Inscription[] = [];

  ngOnInit(): void {
    let params= this.activatedRoute.snapshot.params;
    if(params){
      this.sheduleEventId = params.id;
    }
    this.getInscription();
    console.log(this.inscriptions)
  }
  
  getInscription(): void{
    
    this.checkInService.getInscriptionsByShedEvent(this.sheduleEventId).subscribe(
      (data: Inscription[]) => {
        if (data) {
          console.log(data);
          this.inscriptions = data;

          for (let i = 0; i < this.inscriptions.length; i++) {
            if( this.inscriptions[i].attendance == true) {
              this.changeMod(this.inscriptions[i].attendance);
            }
          }
        }
        
        /*
        this.inscriptions.forEach(inscription => {
          this.generalUserService.getUser(inscription.idUser).subscribe(
            (data: any) => {
              var completeName = data.firstName + ' ' + data.lastName;
              this.inscription.userName = completeName;
              this.inscription.userId = data.email;
              this.inscriptionList.push(this.inscription);
            }
          )
        });
        */
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAttendance() {
    this.inscriptions.forEach(inscription => {
      this.updateInscription = {
        nameUser: inscription.nameUser,
        idUser: inscription.idUser,
        attendance: inscription.attendance,
        idScheduledEvent: inscription.idScheduledEvent,
      }; 
      this.checkInService.updateInscriptions(inscription.idInscription, this.updateInscription).subscribe(
        (data: any) => {
          console.log(data);
          alert('Asistencia guardada exitosamente')
        }
      )
    });
    console.log(this.inscriptions);
  }

  changeMod(val: boolean): void {
    
    console.log(val);
    this.mode = val == true ? false : true;
  }
}