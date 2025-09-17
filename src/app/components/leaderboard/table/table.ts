import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportService } from '../../../services/report-service.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {

  constructor(
    private reportService: ReportService,
  
  ) {}

  ngOnInit():void{
    this.getLeaderboard();
  }

  private url = environment.url;
  leaderBoardList: any = []

  getLeaderboard(){
    this.reportService.getLeaderboard().subscribe({
      next:(response)=>{
        this.leaderBoardList = response;
        // console.log(this.leaderBoardList);
      },
      error: (error) => (console.log(error))
    });


  }

  

}
