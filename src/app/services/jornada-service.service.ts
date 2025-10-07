import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { MessageService } from './message-service.service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService,

  ) {}

  getAllJornadas(): Observable<any> {
    return this.http.get<any>(`${this.url}jornadas`);
  }

  getJornadaByid(id:string): Observable<any>{
    return this.http.get<any>(`${this.url}jornadas/${id}`);
  }

  newJornada(data: any): Observable<any> {
    this.authService.userAutenticated()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.url}/jornadas`, data,{headers});
  }

  
  updateJornada(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

 
  deleteJornada(id: number): Observable<{ success: boolean; message?: string }> {
    return this.http.delete<{ success: boolean; message?: string }>(`${this.url}/${id}`);
  }
  


}
