import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  restartPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)])
  });

  get emailLog(){
    return this.restartPasswordForm.get('email');
  }


  OnSendRestartPassword() {
    if (this.restartPasswordForm.valid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }

}
