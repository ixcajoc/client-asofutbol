import { Component } from '@angular/core';
import { TeamCard } from './team-card/team-card';
import { TeamService } from '../../../services/team-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-team',
  imports: [
    TeamCard,
    CommonModule,
  ],
  templateUrl: './panel-team.html',
  styleUrl: './panel-team.css'
})
export class PanelTeam {
  
  teamList: any = []
  
  ngOnInit():void{
    this.getAllTeams();
  }
  constructor(
    private teamService: TeamService,
  ){}


  getAllTeams(){
    this.teamService.getAllTeams().subscribe({
      next:(response)=>{
        this.teamList = response;
        console.log(this.teamList);
      },
      error: (error) => (console.log(error))
    });


  }


}
