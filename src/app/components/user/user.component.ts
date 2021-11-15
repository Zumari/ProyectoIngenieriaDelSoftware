import { Component, OnInit } from '@angular/core';
import { faBell, faBookOpen, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  faHome = faHome;
  faBook = faBookOpen;
  faStat = faChartBar;
  faBell = faBell;
  nameUser=this.generalUserService.getNombreUsuario();
  constructor(private generalUserService:GeneralUserService) { }

  
 
  ngOnInit(): void {
  }

  eliminarToken():void{
  this.generalUserService.logout();
  }


}
