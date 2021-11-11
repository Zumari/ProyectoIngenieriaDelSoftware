import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token:string):void{
   localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
