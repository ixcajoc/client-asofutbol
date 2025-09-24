import { Component } from '@angular/core';
import { GamesService } from '../../../services/games-service.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-calendar',
  imports: [
    RouterModule
  ],
  templateUrl: './panel-calendar.html',
  styleUrl: './panel-calendar.css'
})
export class PanelCalendar {

  constructor(
    private gamesService: GamesService,
  
  ) {}

  ngOnInit():void{
    this.getAllGames();
  }

  private url = environment.url;
  gamesList: any = []

  getAllGames(){
    this.gamesService.getAllGames().subscribe({
      next:(response)=>{
        this.gamesList = response.data;
      },
      error: (error) => (console.log(error))
    });


  }

  // formatDate(date:any){
  //   let formatDate = new Date(date);
  //   return formatDate.toISOString().split('T')[0];

  // }
  formatDate(date: any) {
    let d = new Date(date);

    let dia = d.getDate().toString().padStart(2, '0');
    let mes = (d.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    let anio = d.getFullYear();

    return `${dia}-${mes}-${anio}`;
  }

  confirmarEliminar(gameId:number) {
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
        this.deleteGame(gameId);
        // this.getAllGames()
      }
    });
  }
    
  deleteGame(gameId:number){
    this.gamesService.deleteGame(gameId).subscribe({
      next: (response) => {
        console.log(response)
      
        Swal.fire({
          title: "¡Eliminado!",
          text: "Item eliminado.",
          icon: "success"
        });

        this.gamesList = this.gamesList.filter(
          (game:any) => game.id_partido !== gameId
        );

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
