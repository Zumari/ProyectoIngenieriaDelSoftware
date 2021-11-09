import { Component, OnInit } from '@angular/core';
import { faBell, faBookOpen, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';

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

  username = 'User Name';
  constructor() { }

  ngOnInit(): void {
  }

}
