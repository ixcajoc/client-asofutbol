import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { MessageService } from './message-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService,

  ) {}

  getAllPlayers(): Observable<any> {
    return this.http.get(`${this.url}players`);
  }
  // getAllPlayers(page: number, limit: number): Observable<any> {
  //   return this.http.get(`${this.url}players?page=${page}&limit=${limit}`);
  // }
  
  getPlayerByName(name:string){
    return this.http.get(`${this.url}players/search?q=${name}`);    
  }

  getPlayerById(id:any){
    return this.http.get<any>(`${this.url}players/${id}`);    
  }

  getTopScorers(){}
  getPlayersbyTeam(){}

  // players/5/stats?seasonId=1
  getPlayerStats(id:number,seasonId:number){
    return this.http.get(`${this.url}players/${id}stats?seasonId=${seasonId}`);
  }

  newPlayer(newPlayer: any ){
    console.log(this.authService.getToken())
    this.authService.userAutenticated()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
      
    return this.http.post<any>(`${this.url}players`,newPlayer, {headers}).subscribe({
        next: (response)=> {
          response;
          this.message.successAlert();
          this.router.navigate(['/']);
        },
        // error: (error) => {
        //   // error;
        //   console.error('Error al crear el jugador:', error);
        //   const errorMessage = error.error?.message || 'Error desconocido';
        //   this.message.errorAlert(error.message);

        // }
        error: (error) => {
            console.error('Error al crear el jugador:', error);
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

  updatePlayer(playerId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}players/${playerId}`, updatedData, { headers });
  }

  // updatePlayer(playerId: number, updatedData: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.authService.getToken()}`
  //   });

  //   return this.http.put<any>(`${this.url}players/${playerId}`, updatedData, { headers }).subscribe({
  //     next: (response) => {
  //       this.message.successAlert();
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       console.error('Error al actualizar el jugador:', error);
  //       const errorMessage = error.error?.message || 'Error desconocido';
  //       this.message.errorAlert(errorMessage);
  //     }
  //   });
  // }

  

  deletePlayer(playerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}players/${playerId}`, { headers });
  }

  // deletePlayer(playerId: number) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.authService.getToken()}`
  //   });

  //   return this.http.delete<any>(`${this.url}players/${playerId}`, { headers }).subscribe({
  //     next: (response) => {
  //       this.message.successAlert();
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       console.error('Error al eliminar el jugador:', error);
  //       const errorMessage = error.error?.message || 'Error desconocido';
  //       this.message.errorAlert(errorMessage);
  //     }
  //   });
  // }

}
