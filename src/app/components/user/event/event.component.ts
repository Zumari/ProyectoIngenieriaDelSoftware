import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/user/events/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    
    
    eventForm = new FormGroup({  
    nombre: new FormControl('',[Validators.required, Validators.pattern('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i')]),
    description_ : new FormControl('',[Validators.required]),
    fechaInicio: new FormControl('',[Validators.required, Validators.pattern('^(\d{4})(\/|-)([0-2][0-9]|3[0-1])\2(0[1-9]|1[0-2])(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])$') ]),
    fechaFinal  : new FormControl('',[Validators.required, Validators.pattern('^(\d{4})(\/|-)([0-2][0-9]|3[0-1])\2(0[1-9]|1[0-2])(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])$') ]),
    
    //image : new FormControl([],[Validators.required,Validators.pattern('/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi')]),
    cantidadParticipantes :new FormControl(0,[Validators.required, Validators.pattern('/^[0-9]$/')]),
    eventoAbierto: new FormControl(true,[Validators.required])
  });
  constructor(private eventServ: EventsService) { }

  ngOnInit(): void {
  }

  CreateEvent(){
    this.eventServ.createEvent(this.eventForm.value).subscribe(
      res => {console.log(res)
      },
      err =>console.log(err)
    )
  }

}
