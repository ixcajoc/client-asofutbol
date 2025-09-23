import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerCard } from './player-card/player-card';
import { PlayerService } from '../../../services/player-service.service';

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

  playerList: any = []
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 10;
  totalItems: number = 0;
    
    ngOnInit():void{
      this.getAllPlayers();
    }
    constructor(
      private playerService: PlayerService,
    ){}
  
  
    // getAllPlayers(){
    //   this.playerService.getAllPlayers(this.currentPage, this.limit).subscribe({
    //     next:(response)=>{
    //       this.playerList = response;
    //       this.totalItems = response.pagination.total;
    //       this.totalPages = response.pagination.pages;
    //       console.log(this.playerList);
    //     },
    //     error: (error) => (console.log(error))
    //   });
    // } 
    
    getAllPlayers(){
      this.playerService.getAllPlayers().subscribe({
        next:(response)=>{
          this.playerList = response.data;
          console.log(this.playerList);
        },
        error: (error) => (console.log(error))
      });
    } 

    cambiarPagina(pagina: number) {
      this.currentPage = pagina;
      this.getAllPlayers();
    }

    // escucho el evento para actualizar la lista y no mostrar los elementos eliminados
    onPlayerDeleted(playerId: number) {
      this.playerList = this.playerList.filter(
        (player:any) => player.id_jugador !== playerId
      );
    }

}
