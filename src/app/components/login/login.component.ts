import { Component, OnInit } from '@angular/core';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({  
    email: new FormControl('',[Validators.required, Validators.pattern('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i')]),
    
    password_: new FormControl('',[Validators.required])
  });
   
  constructor(private router:Router, private authServ:GeneralUserService) { }

  ngOnInit(): void {
  }
  
  Onlogin():void{
    this.authServ.login(this.loginForm.value).subscribe((res)=>{
      if(res){
        this.router.navigate([]);   //DENTRO DE CORCHETES PONER DIRECCIÓN A LA QUE REDIRIGE AL HACER CLICK EN BOTON LOGIN     
      }
    })
  }


  
}


