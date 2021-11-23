import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  restartPasswordForm = new FormGroup({
    password_: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    repassword_: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)])
  });

  get passLog(){
    return this.restartPasswordForm.get('password_');
  }

  get repassLog(){
    return this.restartPasswordForm.get('repassword_');
  }

  OnRestartPassword() {}

}
