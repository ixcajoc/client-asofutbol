import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './auth-service.service';
import { MessageService } from './message-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService
  ) {}

  /** Obtener todos los eventos */
  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${this.url}events`);
  }

  /** Obtener evento por ID */
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}events/${id}`);
  }

  /** Obtener eventos por partido */
  getEventsByMatch(matchId: string): Observable<any> {
    return this.http.get<any>(`${this.url}events/match/${matchId}`);
  }

  /** Obtener eventos por jugador */
  getEventsByPlayer(playerId: string): Observable<any> {
    return this.http.get<any>(`${this.url}events/player/${playerId}`);
  }

  /** Crear nuevo evento (requiere auth: árbitro/admin) */
  newEvent(newEvent: any) {
    this.authService.userAutenticated();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.url}events`, newEvent, { headers });
  }

  /** Actualizar un evento */
  updateEvent(eventId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}events/${eventId}`, updatedData, { headers });
  }

  /** Eliminar un evento */
  deleteEvent(eventId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}events/${eventId}`, { headers });
  }

}