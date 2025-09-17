import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teams-stats',
  imports: [],
  templateUrl: './teams-stats.html',
  styleUrl: './teams-stats.css'
})
export class TeamsStats {
  constructor(
      private reportService: ReportService,
    
    ) {}
  
    ngOnInit():void{
      this.getTeamStats();
    }
  
    private url = environment.url;
    teamStatsList: any = []
  
    getTeamStats(){
      this.reportService.getTeamStats().subscribe({
        next:(response)=>{
          this.teamStatsList = response;
          // console.log(this.teamStatsList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }
}
