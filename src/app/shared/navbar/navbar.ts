import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  currentUser:any = {}

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(){
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.userAutenticated().subscribe({
      next: (response)=> {
        this.currentUser = response.data
        // console.log(response.data)
      },
      error: (error) => {error}
    });
  }

  logout(){
    this.authService.logout();
  }

}
