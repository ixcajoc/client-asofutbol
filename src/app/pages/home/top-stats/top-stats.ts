import { Component } from '@angular/core';
import { TopAsistersCard } from './top-asisters-card/top-asisters-card';
import { TopScorersCard } from './top-scorers-card/top-scorers-card';

@Component({
  selector: 'app-top-stats',
  imports: [
    TopAsistersCard,
    TopScorersCard,

],
  templateUrl: './top-stats.html',
  styleUrl: './top-stats.css'
})
export class TopStats {

}
