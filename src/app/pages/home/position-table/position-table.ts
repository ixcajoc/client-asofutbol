import { Component, Input } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-position-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './position-table.html',
  styleUrl: './position-table.css'
})
export class PositionTable {


  leaderBoardList: any =[]
  @Input() maxRows?: number;
  
  constructor(
  
    private reportService: ReportService,
  )
  {}

  get visibleRows() {
    return this.maxRows ? this.leaderBoardList.slice(0, this.maxRows) : this.leaderBoardList;
  }

  ngOnInit(){
    this.getLeaderboard();
  }

  getLeaderboard(){
    this.reportService.getLeaderboard().subscribe({
      next:(response)=>{
        this.leaderBoardList = response.data;
        // console.log(this.leaderBoardList);
      },
      error: (error) => (console.log(error))
    });
  }

}
