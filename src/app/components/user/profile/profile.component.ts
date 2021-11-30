import { Component, OnInit } from '@angular/core';
import { faBookmark, faCamera, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  display: string = 'none';
  faCamera = faCamera;
  imgPerfil: any;
  faPlusCube = faPlus;
  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  mode: string = 'virtual';
  privacy: string = 'publico';
  keyword: string = ''; 
  previsualizacion: string="";
  urlImage: string="";
  urlImage2!: Observable<string>;
  nameImage="";


  constructor() { }

  ngOnInit(): void {
  }

}
