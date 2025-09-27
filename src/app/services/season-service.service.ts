import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { MessageService } from './message-service.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private url = environment.url;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService,

  ) {}

  getAllStats(): Observable<any> {
    return this.http.get<any>(`${this.url}seasons/1/stats`);
  }
  
}
