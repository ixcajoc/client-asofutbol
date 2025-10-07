import { Component } from '@angular/core';
import { PositionTable } from "../../home/position-table/position-table";
import { TeamService } from '../../../services/team-service.service';
import { SeasonService } from '../../../services/season-service.service';
import { GamesService } from '../../../services/games-service.service';
import { ReportService } from '../../../services/report-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { TopScorers } from "../../../shared/reports/top-scorers/top-scorers";
import { TopScorersCard } from "../../home/top-stats/top-scorers-card/top-scorers-card";
import { RecentGames } from "../../home/recent-games/recent-games";
import { UpcomingGames } from "../../home/upcoming-games/upcoming-games";

@Component({
  selector: 'app-panel-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    PositionTable,
    TopScorersCard,
    RecentGames,
    UpcomingGames
],
  templateUrl: './panel-dashboard.html',
  styleUrl: './panel-dashboard.css'
})
export class PanelDashboard {

 
  constructor(
    private teamService: TeamService,
    private seasonservice: SeasonService,
    private gamesService: GamesService,
    private reportService: ReportService,
    private userService: UserService,
  )
  {}

  ngOnInit(){
    this.getAllStats();
    this.getAllGames();
    this.getScorersTop();
    this.getAssistsTop();
    this.getLeaderboard();
    this.getSeasonSummary();
    this.getAllUsers();
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
  // get yellowCards(): number {
  //   if (!Array.isArray(this.disciplineList)) return 0;
  //   return this.disciplineList.reduce((acc: number, j: any) => acc + j.tarjetas_amarillas, 0);
  // }

  get redCards(): number {
    return this.disciplineList.reduce((acc: number, j: any) => acc + j.tarjetas_rojas, 0);
  }

  get totalCards(): number {
    return this.yellowCards + this.redCards;
  }

  // Porcentaje dinámico
  get yellowPercentage(): number {
    return this.totalCards > 0 ? (this.yellowCards / this.totalCards) * 100 : 0;
  }

  get redPercentage(): number {
    return this.totalCards > 0 ? (this.redCards / this.totalCards) * 100 : 0;
  }

  gamesList: any = []
  getAllGames(){
    this.gamesService.getAllGames().subscribe({
      next:(response)=>{
        this.gamesList = response.data;
      },
      error: (error) => (console.log(error))
    });
  }

  get totalGolesLocal(): number {
    return this.gamesList.reduce((acc: number, p: any) => acc + p.goles_local, 0);
  }

  get totalGolesVisitante(): number {
    return this.gamesList.reduce((acc: number, p: any) => acc + p.goles_visitante, 0);
  }

  get totalGoles(): number {
    return this.totalGolesLocal + this.totalGolesVisitante;
  }

  get porcentajeGolesLocal(): number {
    return this.totalGoles > 0 ? (this.totalGolesLocal / this.totalGoles) * 100 : 0;
  }

  get porcentajeGolesVisitante(): number {
    return this.totalGoles > 0 ? (this.totalGolesVisitante / this.totalGoles) * 100 : 0;
  }

  leaderBoardList: any =[]
  getLeaderboard(){
    this.reportService.getLeaderboard().subscribe({
      next:(response)=>{
        this.leaderBoardList = response.data;
        // console.log(this.leaderBoardList);
      },
      error: (error) => (console.log(error))
    });
  }

  get totalVictorias(): number {
    return this.leaderBoardList.reduce((acc: number, e: any) => acc + e.partidos_ganados, 0);
  }

  get totalEmpates(): number {
    return this.leaderBoardList.reduce((acc: number, e: any) => acc + e.partidos_empatados, 0);
  }

  get totalDerrotas(): number {
    return this.leaderBoardList.reduce((acc: number, e: any) => acc + e.partidos_perdidos, 0);
  }

  get totalPartidos(): number {
    return this.totalVictorias + this.totalEmpates + this.totalDerrotas;
  }

  // Porcentajes
  get victoriasPct(): number {
    return this.totalPartidos > 0 ? (this.totalVictorias / this.totalPartidos) * 100 : 0;
  }

  get empatesPct(): number {
    return this.totalPartidos > 0 ? (this.totalEmpates / this.totalPartidos) * 100 : 0;
  }

  get derrotasPct(): number {
    return this.totalPartidos > 0 ? (this.totalDerrotas / this.totalPartidos) * 100 : 0;
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

  asisterList: any = []
  getAssistsTop(){
    this.reportService.getAssistsTop().subscribe({
      next:(response)=>{
        this.asisterList = response.data;
        // console.log(this.asisterList);
      },
      error: (error) => (console.log(error))
    });
  }

  userList: any =[];
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next:(response)=>{
        this.userList = response.data
      },
      error:(error) => (console.log(error))

    });
  }
  get inactiveCount(): number {
    return this.userList.filter((user:any) => !user.activo).length;
  }


}
