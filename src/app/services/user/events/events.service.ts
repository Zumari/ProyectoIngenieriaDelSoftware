import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/interfaces/event';
import { Status } from 'src/app/interfaces/status';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  constructor(private httpClient:HttpClient) { }
  
  getAllEvents():Observable<Event[]>{
      return this.httpClient.get<Event[]>(`http://localhost:3000/events/getAllEvents`,{});
  }
  
  getEvent(idEvento:number):Observable<Event>{
       return this.httpClient.get<Event>(`http://localhost:3000/events/getOneEventById/${idEvento}`,{});
  }
  
  createEvent(event:Event):Observable<Event>{
    return this.httpClient.post<Event>('http://localhost:3000/events/createEvent',event);
   }

  /*getEventsForUser(email : string):Observable<Event[]>{
   return this.httpClient.get<Event[]>(`http://localhost:3000/events/${email}/`,{});
  }*/
 
  

  updateEvent(idEvento:number, event:Event):Observable<Event>{
    return this.httpClient.put<Event>(`http://localhost:3000/events/updateEvent/${idEvento}`,event);
   } 

  deleteEvent(idEvento:number):Observable<Event>{
   return this.httpClient.delete<Event>(`http://localhost:3000/events/deleteEvent/${idEvento}`,{});
  }



//Status 


  getStatus(statusId: number):Observable<Status>{
   return this.httpClient.get<Status>(`http://localhost:/status/getStatus/${statusId}`,{});
  }

  
  getAllStatus():Observable<Status[]>{
    return this.httpClient.get<Status[]>(`http://localhost:/status/getAll`,{});
   }

  updateStatus(statusId:number):Observable<Status>{
    return this.httpClient.put<Status>(`http://localhost:/status/${statusId}/`,{});
   } 





}
