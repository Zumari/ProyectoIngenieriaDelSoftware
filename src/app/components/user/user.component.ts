import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User= {  email: '',
    password_: '',
    firstName : '',
    middleName  : '',
    lastname : '',
    secondLastName : '',
    academicTraining  : '',
    description_ : '',
    interests : '',
    institutionRepresenting :''
  };
  constructor(private generalUserService:GeneralUserService) { }

  ngOnInit(): void {
  }

  
  CreateUser(){
    this.generalUserService.createUser(this.user).subscribe(
      res => {console.log(res)
      },
      err =>console.log(err)
    )
  }
}
