import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../../services/player-service.service';
import { TeamService } from '../../../../services/team-service.service';

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
  @Output() teamDeleted = new EventEmitter<number>();

  constructor(
    private teamService: TeamService
  ){}

  confirmarEliminar(teamId:number) {
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
        this.deleteTeam(teamId);
        // this.getAllPlayers()
      }
    });
  }
  
  deleteTeam(teamId:number){
    this.teamService.deleteTeam(teamId).subscribe({
      next: (response) => {
        console.log(response)
        this.teamDeleted.emit(teamId);
      
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
