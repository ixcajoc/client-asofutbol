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
export class GamesService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService,

  ) {}

  getAllGames(): Observable<any> {
      return this.http.get<any>(`${this.url}matches`);
  }

  getGameByid(id:string): Observable<any>{
    return this.http.get<any>(`${this.url}matches/${id}`);
  }

  getUpcomingGames(): Observable<any>{
    return this.http.get<any>(`${this.url}matches/upcoming`);
  }

  getGameEvents(id:string): Observable<any>{
    return this.http.get<any>(`${this.url}matches/${id}/events`);
  }

  newGame(newGame: any ){
    
    this.authService.userAutenticated()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
      
    return this.http.post<any>(`${this.url}matches`,newGame, {headers}).subscribe({
        next: (response)=> {
          response;
          this.message.successAlert();
          this.router.navigate(['/dashboard1/calendar/panel-calendar']);
        },
        // error: (error) => {
        //   // error;
        //   console.error('Error al crear el jugador:', error);
        //   const errorMessage = error.error?.message || 'Error desconocido';
        //   this.message.errorAlert(error.message);

        // }
        error: (error) => {
            console.error('Error al crear el juego:', error);
            const errorMessage = error.error?.message || 'Error desconocido';

            // Manejo de errores de validación
            if (error.error?.errors) {
                error.error.errors.forEach((err: any) => {
                    const fieldMessage = `Error en el campo ${err.path}: ${err.msg}`;
                    this.message.errorAlert(fieldMessage);
                });
            } else {
                this.message.errorAlert(errorMessage);
            }
        }
      }); 
  }

  updateGame(gameId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}matches/${gameId}`, updatedData, { headers });
  }


  deleteGame(gameId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}matches/${gameId}`, { headers });
  }


}
