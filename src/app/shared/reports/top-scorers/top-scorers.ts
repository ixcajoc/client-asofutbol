import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';

@Component({
  selector: 'app-top-scorers',
  imports: [],
  templateUrl: './top-scorers.html',
  styleUrl: './top-scorers.css'
})
export class TopScorers {

  constructor(
        private reportService: ReportService,
      
      ) {}
    
      ngOnInit():void{
        this.getScorersTop();
      }
    
      scorersList: any = []
    
      getScorersTop(){
        this.reportService.getScorersTop().subscribe({
          next:(response)=>{
            this.scorersList = response;
            // console.log(this.scorersList);
          },
          error: (error) => (console.log(error))
        });
    
    
      }

}
