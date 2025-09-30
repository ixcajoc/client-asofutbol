import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../services/team-service.service';
import { SeasonService } from '../../services/season-service.service';
import { GamesService } from '../../services/games-service.service';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report-service.service';
import { NavHome } from "./nav-home/nav-home";
import { HeroSection } from "./hero-section/hero-section";
import { RecentGames } from "./recent-games/recent-games";
import { PositionTable } from "./position-table/position-table";
import { TopStats } from "./top-stats/top-stats";
import { NewsCard } from "./news/news-card/news-card";
import { FooterHome } from "./footer-home/footer-home";
import { News } from "./news/news";
import { UpcomingGames } from "./upcoming-games/upcoming-games";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    NavHome,
    HeroSection,
    RecentGames,
    PositionTable,
    TopStats,
    FooterHome,
    News,
    UpcomingGames
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // statList: any = []
  // gamesList: any = []
  // leaderBoardList: any =[]
 
  //  constructor(
  //   private teamService: TeamService,
  //   private seasonservice: SeasonService,
  //   private gamesService: GamesService,
  //   private reportService: ReportService,
  // )
  // {}

  // ngOnInit(){
  //   this.getAllStats();
  //   this.getAllGames();
  //   this.getScorersTop();
  //   this.getAssistsTop();
  //   this.getLeaderboard();
  //   this.getSeasonSummary();

  // }

  // scrollToSection(sectionId: string) {
  //   const el = document.getElementById(sectionId);
  //   if (el) {
  //     el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }

  // getAllStats(){
  //   this.seasonservice.getAllStats().subscribe({
  //     next:(response)=>{
  //       this.statList = response.data;
  //       // console.log(this.statList);
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  // seasonSummaryList: any = {}
  // getSeasonSummary(){
  //   this.reportService.getSeasonSummary().subscribe({
  //     next:(response)=>{
  //       this.seasonSummaryList = response.data.general;
  //       // console.log(this.statList);
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  // getAllGames(){
  //   this.gamesService.getAllGames().subscribe({
  //     next:(response)=>{
  //       this.gamesList = response.data;
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  // getLeaderboard(){
  //   this.reportService.getLeaderboard().subscribe({
  //     next:(response)=>{
  //       this.leaderBoardList = response.data;
  //       console.log(this.leaderBoardList);
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  // scorersList: any = []
  // getScorersTop(){
  //   this.reportService.getScorersTop().subscribe({
  //     next:(response)=>{
  //       this.scorersList = response.data;
  //       // console.log(this.scorersList);
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  // asisterList: any = []
  // getAssistsTop(){
  //   this.reportService.getAssistsTop().subscribe({
  //     next:(response)=>{
  //       this.asisterList = response.data;
  //       // console.log(this.asisterList);
  //     },
  //     error: (error) => (console.log(error))
  //   });
  // }

  
}
