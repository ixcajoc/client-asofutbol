import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';
import { ExportButton } from '../../export-button/export-button';
import { Banner } from '../../banner/banner';

@Component({
  selector: 'app-top-assisters',
  imports: [
    ExportButton,
    Banner
  ],
  templateUrl: './top-assisters.html',
  styleUrl: './top-assisters.css'
})
export class TopAssisters {

  constructor(
      private reportService: ReportService,
    
    ) {}
  
    ngOnInit():void{
      this.getAssistsTop();
    }
  
    asisistsList: any = []
  
    getAssistsTop(){
      this.reportService.getAssistsTop().subscribe({
        next:(response)=>{
          this.asisistsList = response.data;
          // console.log(this.asisistsList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }

}
