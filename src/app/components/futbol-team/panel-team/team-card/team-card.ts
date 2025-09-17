import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css'
})
export class TeamCard {

  @Input() teamData!: any;

}
