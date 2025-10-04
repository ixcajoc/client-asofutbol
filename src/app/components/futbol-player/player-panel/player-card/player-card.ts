import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../../services/player-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  imports: [
    RouterModule,
    CommonModule,
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

  isPos(pos: 'PORTERO' | 'DEFENSA' | 'MEDIOCAMPISTA' | 'DELANTERO'): boolean {
    return (this.playerData?.posicion || '').toUpperCase() === pos;
  }

  // ngOnInit():void{
  //   this.getAllPlayers();
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

  get playerImgUrl(): string {
    // Si luego tienes campo foto, cámbialo aquí
    return 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=300&q=80';
  }

  onImgError(e: Event) {
    const el = e.target as HTMLImageElement;
    el.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
              fill="#6b7280" font-size="14" font-family="Arial">Sin foto</text>
      </svg>
    `);
  }

  getEdad(fechaIso?: string): number | null {
    if (!fechaIso) return null;
    const d = new Date(fechaIso);
    const hoy = new Date();
    let edad = hoy.getFullYear() - d.getFullYear();
    const m = hoy.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < d.getDate())) edad--;
    return edad;
  }

  formatAltura(a?: string): string {
    if (!a) return '—';
    const n = Number(a);
    if (isNaN(n)) return a;
    // Si viene en metros como "1.85"
    return `${n.toFixed(2)} m`;
  }

  formatPeso(p?: string): string {
    if (!p) return '—';
    const n = Number(p);
    if (isNaN(n)) return p;
    return `${n.toFixed(1)} kg`;
  }


}
