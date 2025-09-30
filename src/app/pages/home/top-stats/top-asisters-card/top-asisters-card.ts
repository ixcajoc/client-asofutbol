import { Component } from '@angular/core';
import { ReportService } from '../../../../services/report-service.service';

@Component({
  selector: 'app-top-asisters-card',
  imports: [],
  templateUrl: './top-asisters-card.html',
  styleUrl: './top-asisters-card.css'
})
export class TopAsistersCard {

  statList: any = []
    gamesList: any = []
    leaderBoardList: any =[]
   
     constructor(
    
      private reportService: ReportService,
    )
    {}
  
    ngOnInit(){
      this.getAssistsTop(); 
    }

  
    asisterList: any = []
    getAssistsTop(){
      this.reportService.getAssistsTop().subscribe({
        next:(response)=>{
          this.asisterList = response.data;
          // console.log(this.asisterList);
        },
        error: (error) => (console.log(error))
      });
    }
  

}
