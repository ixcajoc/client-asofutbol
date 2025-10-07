import { Component } from '@angular/core';
import { TeamCard } from './team-card/team-card';
import { TeamService } from '../../../services/team-service.service';
import { CommonModule } from '@angular/common';
import { Paginator } from '../../../shared/paginator/paginator';
import { Banner } from "../../../shared/banner/banner";
import { ExportButton } from "../../../shared/export-button/export-button";

@Component({
  selector: 'app-panel-team',
  imports: [
    TeamCard,
    CommonModule,
    Paginator,
    Banner,
    ExportButton
],
  templateUrl: './panel-team.html',
  styleUrl: './panel-team.css'
})
export class PanelTeam {
  
  teamList: any = []
  currentPage = 1;
  limit = 10;
  totalItems = 0;
  totalPages = 0;
  isLoading = false;
  
  ngOnInit():void{
    this.getAllTeams();
  }
  constructor(
    private teamService: TeamService,
  ){}


  getAllTeams(){
    this.teamService.getAllTeams(this.currentPage, this.limit).subscribe({
      next:(response)=>{
        this.teamList = response.data;
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.pages;
        this.currentPage = response.pagination.page;
        // console.log(this.teamList);
      },
      error: (error) => (console.log(error))
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllTeams();
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1; // resetear a página 1
    this.getAllTeams();
  }
   // escucho el evento para actualizar la lista y no mostrar los elementos eliminados
    onTeamDeleted(teamId: number) {
      this.teamList = this.teamList.filter(
        (team:any) => team.id_equipo !== teamId
      );
    }


}
