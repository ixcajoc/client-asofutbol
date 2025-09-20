import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportService } from '../../../services/report-service.service';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {

  constructor(
    private reportService: ReportService,
    private authService: AuthService,
  
  ) {

    // const token = this.authService.getToken()
    // console.log(token)
  }

  ngOnInit():void{
    this.getLeaderboard();
    // this.getCurrentUser()

    this.authService.userAutenticated()
  }

  private url = environment.url;
  leaderBoardList: any = []
  userAutenticated: any = []

  getLeaderboard(){
    this.reportService.getLeaderboard().subscribe({
      next:(response)=>{
        this.leaderBoardList = response;
        // console.log(this.leaderBoardList);
      },
      error: (error) => (console.log(error))
    });
  }

  // funciona correctamente
  // getCurrentUser(){
  //   this.authService.userAutenticated().subscribe({
  //     next: (response)=> {
  //       this.userAutenticated = response.data;
  //       console.log(this.userAutenticated)
  //     },
  //     error: (error) => {error}
  //   });

  // }
  

  

}
