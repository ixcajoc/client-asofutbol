import { Component } from '@angular/core';
import { GamesService } from '../../../services/games-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recent-games',
  imports: [DatePipe],
  templateUrl: './recent-games.html',
  styleUrl: './recent-games.css'
})
export class RecentGames {

  gamesList: any = []
  
    constructor(
    private gamesService: GamesService,
  )
  {}
  
  ngOnInit(){
    this.getAllGames();  
  }

  

  getAllGames(){
    this.gamesService.getAllGames().subscribe({
      next:(response)=>{
        this.gamesList = response.data;
      },
      error: (error) => (console.log(error))
    });
  }

  
  
  

}
