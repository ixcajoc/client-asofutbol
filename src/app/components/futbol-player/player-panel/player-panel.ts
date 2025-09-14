import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerCard } from './player-card/player-card';

@Component({
  selector: 'app-player-panel',
  imports: [
    CommonModule,
    PlayerCard,
  ],
  templateUrl: './player-panel.html',
  styleUrl: './player-panel.css'
})
export class PlayerPanel {

}
