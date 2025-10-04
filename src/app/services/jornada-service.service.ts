import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  newJoranda(){

  }
  editJornada(){

  }
  deleteJornada(){

  }


}
