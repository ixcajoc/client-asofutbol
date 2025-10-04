import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAllUsers(page = 1,limit = 10, orderBy: string = 'id_jugador', order: 'ASC' | 'DESC' = 'ASC'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('orderBy', orderBy)
      .set('order', order);

    return this.http.get<any>(`${this.url}users`,{headers, params});
  }
  getUsersById(id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.url}users/${id}`, { headers});    
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

  newUser(newUser: any ){
    // this.authService.userAutenticated()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
      
    return this.http.post<any>(`${this.url}users`,newUser, {headers})
  }
  
  updateUser(userId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<any>(`${this.url}users/${userId}`, updatedData, { headers });
  }


  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}users/${userId}`, { headers });
  }



}
