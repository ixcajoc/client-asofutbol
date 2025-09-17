import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-discipline-table',
  imports: [],
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
          this.disciplineList = response;
          // console.log(this.disciplineList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }

}
