import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';
import { Banner } from '../../banner/banner';
import { ExportButton } from '../../export-button/export-button';

@Component({
  selector: 'app-discipline-table',
  imports: [
    Banner,
    ExportButton,
  ],
  templateUrl: './discipline-table.html',
  styleUrl: './discipline-table.css'
})
export class DisciplineTable {

  constructor(
      private reportService: ReportService,
    
    ) {}
  
    ngOnInit():void{
      this.getDisciplineReport();
    }
  
    private url = environment.url;
    disciplineList: any = []
  
    getDisciplineReport(){
      this.reportService.getDisciplineTable().subscribe({
        next:(response)=>{
          this.disciplineList = response.data;
          // console.log(this.disciplineList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }

}
