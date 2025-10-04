import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
      private http: HttpClient,
      private router: Router,
  
    ) {}

  private url = environment.url;

  getLeaderboard(): Observable<any>{
    return this.http.get(`${this.url}reports/standings?seasonId=1`);
  }
  getScorersTop(): Observable<any>{
    return this.http.get(`${this.url}reports/scorers?seasonId=1`);
  }
  getAssistsTop(): Observable<any>{
    return this.http.get(`${this.url}reports/assists?seasonId=1`);
  }
  getDisciplineTable(): Observable<any>{
    return this.http.get(`${this.url}reports/discipline?seasonId=1`);
  }
  getTeamStats(): Observable<any>{
    return this.http.get(`${this.url}reports/team-stats?seasonId=1`);
  }
  // getGamesByDay(): Observable<any>{
  //   return this.http.get(`${this.url}reports/matchday?seasonId=1&matchday=1`);
  // }
   // En ReportService
  getGamesByDay(seasonId: number): Observable<any> {
    return this.http.get(`${this.url}/reports/matchday?seasonId=${seasonId}`);
  }

  getGamesByMatchday(seasonId: number, matchday: number): Observable<any> {
    return this.http.get(`${this.url}/reports/matchday?seasonId=${seasonId}&matchday=${matchday}`);
  }

  getSeasonSummary(): Observable<any>{
    return this.http.get(`${this.url}reports/season-summary?seasonId=1`);
  }
}
