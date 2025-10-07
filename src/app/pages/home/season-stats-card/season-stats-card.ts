import { Component } from '@angular/core';
import { SeasonService } from '../../../services/season-service.service';
import { ReportService } from '../../../services/report-service.service';

@Component({
  selector: 'app-season-stats-card',
  imports: [],
  templateUrl: './season-stats-card.html',
  styleUrl: './season-stats-card.css'
})
export class SeasonStatsCard {

  constructor(
    private seasonservice: SeasonService,
    private reportService: ReportService,
  )
  {}
  
  ngOnInit(){
    this.getAllStats();
    this.getSeasonSummary();
    this.getDisciplineReport();

  }

  statList: any = []
  getAllStats(){
    this.seasonservice.getAllStats().subscribe({
      next:(response)=>{
        this.statList = response.data;
        // console.log(this.statList);
      },
      error: (error) => (console.log(error))
    });
  }

  seasonSummaryList: any = {}
  getSeasonSummary(){
    this.reportService.getSeasonSummary().subscribe({
      next:(response)=>{
        this.seasonSummaryList = response.data.general;
        // console.log(this.statList);
      },
      error: (error) => (console.log(error))
    });
  }

  disciplineList: any = []
  getDisciplineReport(){
    this.reportService.getDisciplineTable().subscribe({
      next:(response)=>{
        this.disciplineList = response.data;
        // console.log(this.statList);
      },
      error: (error) => (console.log(error))
    });
  }
  get yellowCards(): number {
    return this.disciplineList.reduce((acc: number, j: any) => acc + j.tarjetas_amarillas, 0);
  }
  get redCards(): number {
    return this.disciplineList.reduce((acc: number, j: any) => acc + j.tarjetas_rojas, 0);
  }
  

}
