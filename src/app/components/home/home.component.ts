import { Component, OnInit } from '@angular/core';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faBookmark = faBookmark;
  faLock = faLock;

  eventos: any = [{
    titulo: 'Prueba',
    fecha: '2021-11',
    modalidad: 'Virtual'
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
