import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { MessageService } from './message-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private message: MessageService,

  ) {}

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<any>(`${this.url}users`, {headers});
  }

  getAllCoaches(rol:string): Observable<any> {
    return this.getAllUsers().pipe(
      map((response: any) => {
        const puestos = response.data?.filter((user: any) => 
          // user.nombre_rol === `${rol}` 
          user.nombre_rol === rol 
          // user.tipo === 'entrenador' ||
          // user.user_type === 'coach'
          // Ajusta según el campo que uses para identificar entrenadores
        ) || [];
        
        return { ...response, data: puestos };
      })
    );
}

}
