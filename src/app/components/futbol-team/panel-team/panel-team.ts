import { Component } from '@angular/core';
import { TeamCard } from './team-card/team-card';

@Component({
  selector: 'app-panel-team',
  imports: [TeamCard],
  templateUrl: './panel-team.html',
  styleUrl: './panel-team.css'
})
export class PanelTeam {

}
