import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class GeneralUserService {

  constructor(private httpClient:HttpClient) { }

  createUser(user:User):Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/users/createUser',{});
   }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:3000/users/getAllUsers',{});
   }
   
  getUser(email:String):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:3000/users/getUser/${email}`,{});
   } 
  
  deleteUser(email:String):Observable<User>{
    return this.httpClient.delete<User>(`http://localhost:3000/users/deleteUser/${email}`,{});
   } 
  
    
  updateUser(email:String, user:User):Observable<User>{
    return this.httpClient.put<User>(`http://localhost:3000/deleteUser/${email}`,user);
   } 

  
}
