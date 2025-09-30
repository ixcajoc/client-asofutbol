import { Component } from '@angular/core';
import { ReportService } from '../../../../services/report-service.service';

@Component({
  selector: 'app-top-scorers-card',
  imports: [],
  templateUrl: './top-scorers-card.html',
  styleUrl: './top-scorers-card.css'
})
export class TopScorersCard {
   
  constructor(
    private reportService: ReportService,
  )
  {}
  
  ngOnInit(){
    this.getScorersTop();
  }

  scorersList: any = []
  getScorersTop(){
    this.reportService.getScorersTop().subscribe({
      next:(response)=>{
        this.scorersList = response.data;
        // console.log(this.scorersList);
      },
      error: (error) => (console.log(error))
    });
  }

}
