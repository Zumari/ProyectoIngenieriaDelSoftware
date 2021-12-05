import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/interfaces/inscription';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }
 
  
  createInscription(scheduledEventId: number, usuarioId: string):Observable<any>{
    return this.http.post<any>(`http://localhost:3000/inscriptions/createInscription/`,{scheduledEventId,usuarioId});
  }

  deleteInscription(inscriptionId:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/inscriptions/deleteInscription/${inscriptionId}`,);
  }

  getOneInscription(inscriptionId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/inscriptions/getInscription/${inscriptionId}`)
  }

  getInscriptions():Observable<any>{
    return this.http.get<any>(`http://localhost:3000/inscriptions/getAll`)
  }

  updateInscriptions(inscriptionId:number, insc: Inscription):Observable<any>{
    return this.http.put<any>(`http://localhost:3000/inscriptions/updateInscription/${inscriptionId}`, insc);
  }

}

