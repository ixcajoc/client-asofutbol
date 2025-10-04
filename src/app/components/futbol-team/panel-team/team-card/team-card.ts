import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TeamService } from '../../../../services/team-service.service';

@Component({
  selector: 'app-team-card',
  imports: [
    RouterModule,
    CommonModule
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

  confirmarEliminar(teamId: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTeam(teamId);
      }
    });
  }
  
  deleteTeam(teamId: number) {
    this.teamService.deleteTeam(teamId).subscribe({
      next: (response) => {
        console.log(response);
        this.teamDeleted.emit(teamId);
      
        Swal.fire({
          title: "¡Eliminado!",
          text: "Equipo eliminado correctamente.",
          icon: "success"
        });
      },
      error: (error) => {
        console.error('Error al eliminar el equipo:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        Swal.fire({
          title: "Algo salió mal",
          text: `Error: ${errorMessage}`,
          icon: "error"
        });
      }
    });
  }

  // Helper para calcular contraste de texto sobre color de fondo
  getContrast(hex: string): string {
    if (!hex) return '#111827';
    try {
      const c = hex.replace('#', '');
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? '#111827' : '#ffffff';
    } catch {
      return '#111827';
    }
  }

  // Fallback para logo roto
  onLogoError(e: Event) {
    const el = e.target as HTMLImageElement;
    el.src = 'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="14" font-family="Arial">Sin logo</text>
        </svg>`
      );
  }

  // Wrapper para el botón eliminar
  onEliminar(id?: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!id) return;
    this.confirmarEliminar(id);
  }
}