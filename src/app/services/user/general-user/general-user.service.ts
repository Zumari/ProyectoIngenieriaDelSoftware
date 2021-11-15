import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Auth, UserResponse } from 'src/app/interfaces/auth';
import { tap } from 'rxjs/operators';
//import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class GeneralUserService {

  constructor(private httpClient:HttpClient) { }

  createUser(user:User):Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/users/register',user);
   }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:3000/users/getAllUsers',);
   }
   
  getUser(email:String):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:3000/users/getUser/${email}`,);
   } 
  
  deleteUser(email:String):Observable<User>{
    return this.httpClient.delete<User>(`http://localhost:3000/users/deleteUser/${email}`,);
   } 
  
    
  updateUser(email:String, user:User):Observable<User>{
    return this.httpClient.put<User>(`http://localhost:3000/users/updateUser/${email}`,user);
   } 


   
  login(userAuth:Auth):Observable<UserResponse>{
    return this.httpClient.post<UserResponse>(`http://localhost:3000/auth/login`,userAuth)
    .pipe(
      tap((res: UserResponse)=>{
        if(res){
          console.log('Res =>>>', res);
          this.setToken(JSON.stringify(res))
        }
        
      }));
  }

  logout():void{
    localStorage.removeItem('token');
  }

  
   setToken(token: string):void{
     console.log("llego esta M",token);
    localStorage.setItem('token',token) ;
  
  }
  
  getToken():string{
  const userToken = JSON.stringify(localStorage.getItem('token'));
  return userToken;
  }

  isLogged(): boolean {
    if (!this.getToken()) {
      return false;
    }
    return true;
  }

  getNombreUsuario(): string {
    if (!this.isLogged()) {
      return 'user loco'
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.firstName;
    return nombreUsuario;
  }
 
  getEmail(): string {
    if (!this.isLogged()) {
      return 'user loco'
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const email = valuesJson.email;
    return email;
  }

  logOut(): void {
    localStorage.clear();
  }
}
