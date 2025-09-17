import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
      private http: HttpClient,
      private router: Router,
  
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

// recordar que para no tener tanto problema con los usuarios, 
// quitar permisos y roles y dejar libre para que validemos unicamente con if en los componentes
  
}
