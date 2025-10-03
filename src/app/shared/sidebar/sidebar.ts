import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    CommonModule
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  
  constructor(
    private authService: AuthService,

  ){}

  ngOnInit(){
    this.getUserAutenticated();
  }

  currentUser:any = {}
  getUserAutenticated(){
    this.authService.userAutenticated().subscribe({
      next: (response)=> {
        this.currentUser = response.data;
        this.userRole= response.data.role;
        // console.log(response.data)
        // this.setUserAutenticated(response.data)
      },
      error: (error) => {error}
    });
  }



  userRole: string = '';

  // Permisos por rol
  permissions = {
    ADMINISTRADOR: {
      dashboard: true,
      usuarios: true,
      equipos: true,
      futbolistas: true,
      reportes: true,
      calendar: true,
      temporadas: true,
      documentation: true,
      perfil: true
    },
    ARBITRO: {
      dashboard: false,
      usuarios: false,
      equipos: false,
      futbolistas: false,
      reportes: true,
      calendar: true,
      temporadas: false,
      documentation: false,
      perfil: true
    },
    ENTRENADOR: {
      dashboard: true,
      usuarios: false,
      equipos: true,
      futbolistas: true,
      reportes: false,
      calendar: false,
      temporadas: false,
      documentation: false,
      perfil: true
    },
    JUGADOR: {
      dashboard: false,
      usuarios: false,
      equipos: false,
      futbolistas: false,
      reportes: false,
      calendar: false,
      temporadas: false,
      documentation: false,
      perfil: true
    },
    COMUNIDAD: {
      dashboard: false,
      usuarios: false,
      equipos: false,
      futbolistas: false,
      reportes: false,
      calendar: false,
      temporadas: false,
      documentation: false,
      perfil: false
    }
  };


  hasPermission(section: string): boolean {
    return this.permissions[this.userRole as keyof typeof this.permissions]?.[section as keyof typeof this.permissions.ADMINISTRADOR] || false;
  }

}
