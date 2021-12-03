import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  
  UserScheduledEvent(EventId:number, UserId:string):Observable<any>{
    return this.http.post<any>(`http://localhost:3000/events/createEvent/${EventId}`,UserId);
  }

  DeleteUserScheduledEvent(UserId:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/events/createEvent/${UserId}`,);
  }

  
}
