import { Component } from '@angular/core';
import { ReportService } from '../../../services/report-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-games-by-day',
  imports: [],
  templateUrl: './games-by-day.html',
  styleUrl: './games-by-day.css'
})
export class GamesByDay {

  constructor(
      private reportService: ReportService,
    
    ) {}
  
    ngOnInit():void{
      this.getGamesByDay();
    }
  
    private url = environment.url;
    gamesList: any = []
  
    getGamesByDay(){
      this.reportService.getGamesByDay().subscribe({
        next:(response)=>{
          this.gamesList = response;
          // console.log(this.gamesList);
        },
        error: (error) => (console.log(error))
      });
  
  
    }

}
