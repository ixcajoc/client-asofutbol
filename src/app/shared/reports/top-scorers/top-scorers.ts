import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { ExportButton } from '../../export-button/export-button';
import { Banner } from '../../banner/banner';

@Component({
  selector: 'app-top-scorers',
  imports: [
    ExportButton,
    Banner
  ],
  templateUrl: './top-scorers.html',
  styleUrl: './top-scorers.css'
})
export class TopScorers {

  constructor(
        private reportService: ReportService,
      
      ) {
        // this.scorersList;
      }
    
      ngOnInit():void{
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
