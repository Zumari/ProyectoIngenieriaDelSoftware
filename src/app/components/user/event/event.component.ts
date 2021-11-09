import { Component, OnInit } from '@angular/core';
import { faCertificate, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  faPlus = faPlusCircle;
  faTrash = faTrash;
  event: any = {
    name: 'Prueba',
    startDate: '2021-11-20',
    endDate: '2021-11-21',
    institute: 'UNAH',
    description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    organizer: 'user name',
    startTime: '09:00',
    endTime: '23:00',
    image: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
