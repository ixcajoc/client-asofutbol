import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-top-assisters',
  imports: [],
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
          this.asisistsList = response;
          // console.log(this.asisistsList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }

}
