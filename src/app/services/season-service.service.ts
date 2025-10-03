import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getAllSeasons(): Observable<any> {
    return this.http.get<any>(`${this.url}seasons`);
  }
  getSeasonActive(): Observable<any> {
    return this.http.get<any>(`${this.url}seasons/active`);
  }
  getSeasonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}seasons/${id}`);
  }
  getSeasonLeaderboard(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}seasons/${id}/standings`);
  }
  getSeasonStats(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}seasons/${id}/stats`);
  }
  newSeason(newSeason: any) {
    this.authService.userAutenticated();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.url}seasons`, newSeason, { headers });
  }
  updateSeason(seasonId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}seasons/${seasonId}`, updatedData, { headers });
  }
  deleteSeason(seasonId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}seasons/${seasonId}`, { headers });
  }

  activateSeason(seasonId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}seasons/${seasonId}/activate`,{},{ headers });
  }

  



  
}
