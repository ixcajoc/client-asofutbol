import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-card',
  imports: [
    RouterModule
  ],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css'
})
export class TeamCard {

  @Input() teamData!: any;

}
