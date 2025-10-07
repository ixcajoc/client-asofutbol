import { Component, LOCALE_ID } from '@angular/core';
import { GamesService } from '../../../services/games-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-games',
  imports: [
    DatePipe
  ],


  
  templateUrl: './upcoming-games.html',
  styleUrl: './upcoming-games.css'
})

export class UpcomingGames {

  constructor(
    private gameService : GamesService
  ){}

  ngOnInit(){
    this.getUpcomingMatches();
  }

  gamesList:any = [];
  getUpcomingMatches(limit: number = 20, team?: number) {
  this.gameService.getUpcomingMatches(limit, team).subscribe({
    next: (response) => {
      this.gamesList = response.data;
      console.log(this.gamesList)
    },
    error: (error) => console.log(error)
  });
}

}
