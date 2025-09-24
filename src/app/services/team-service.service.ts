import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
      private http: HttpClient,
      private router: Router,
      private authService: AuthService,
  
    ) {}

  private url = environment.url;

  getAllTeams(): Observable<any>{
    return this.http.get(`${this.url}teams`);
  }

  getTeamByid(id:string): Observable<any>{
    return this.http.get(`${this.url}teams/${id}`);
  }

  getStatsOfTeam(teamId:string, seasonId:string): Observable<any>{
    return this.http.get(`${this.url}teams/${teamId}/stats?seasonId=${seasonId}`);
  }

  newTeam(newTeam: any ){
    this.authService.userAutenticated()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.url}teams`,newTeam, {headers})
  }

  updateTeam(playerId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}teams/${playerId}`, updatedData, { headers });
  }

  deleteTeam(teamId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}teams/${teamId}`, { headers });
  }
  

// recordar que para no tener tanto problema con los usuarios, 
// quitar permisos y roles y dejar libre para que validemos unicamente con if en los componentes
  
}
