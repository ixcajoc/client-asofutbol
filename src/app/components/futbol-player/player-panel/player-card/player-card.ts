import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../../services/player-service.service';

@Component({
  selector: 'app-player-card',
  imports: [
    RouterModule
  ],
  templateUrl: './player-card.html',
  styleUrl: './player-card.css'
})
export class PlayerCard {
  @Input() playerData!: any;
  @Output() playerDeleted = new EventEmitter<number>();

  playerList: any = []
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 10; // Cambia según tu API
  totalItems: number = 0;

  constructor(
    private playerService: PlayerService
  ){}

  // ngOnInit():void{
  //   this.getAllPlayers();
  // }

  // getAllPlayers(){
  //     this.playerService.getAllPlayers(this.currentPage, this.limit).subscribe({
  //       next:(response)=>{
  //           this.totalItems = response.pagination.total;
  //           this.totalPages = response.pagination.pages;
  //           this.playerList = response.data;
  //           console.log(this.playerList);
  //       },
  //       error: (error) => (console.log(error))
  //     });
  // } 
  getAllPlayers(){
      this.playerService.getAllPlayers().subscribe({
        next:(response)=>{
            this.playerList = response.data;
            // console.log(this.playerList);
        },
        error: (error) => (console.log(error))
      });
  } 

  confirmarEliminar(playerId:number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta accion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePlayer(playerId);
        // this.getAllPlayers()
      }
    });
  }

  deletePlayer(playerId:number){
    this.playerService.deletePlayer(playerId).subscribe({
      next: (response) => {
        console.log(response)
        this.playerDeleted.emit(playerId);
        // this.playerList = this.playerList.filter(
        //   (player: any) => player.id_jugador !== playerId
        // );
        // this.getAllPlayers()
        Swal.fire({
          title: "¡Eliminado!",
          text: "Item eliminado.",
          icon: "success"
        });

      },
      error: (error) => {
        console.error('Error al eliminar el jugador:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        Swal.fire({
          title: "Algo salió mal",
          text: `Error: ${errorMessage}`,
          icon: "error"
        });
      }
    });


  }


}
