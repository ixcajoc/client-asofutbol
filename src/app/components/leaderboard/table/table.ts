import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/report-service.service';
import { AuthService } from '../../../services/auth-service.service';
import { Banner } from '../../../shared/banner/banner';
import { ExportButton } from '../../../shared/export-button/export-button';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    Banner,
    ExportButton,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {

  leaderBoardList: any[] = [];

  constructor(
    private reportService: ReportService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getLeaderboard();
    this.authService.userAutenticated();
  }

  getLeaderboard() {
    this.reportService.getLeaderboard().subscribe({
      next: (response) => {
        this.leaderBoardList = response.data;
        console.log('Tabla de posiciones:', this.leaderBoardList);
      },
      error: (error) => {
        console.error('Error al cargar la tabla:', error);
      }
    });
  }

  // Obtener iniciales del equipo para avatar
  getTeamInitials(teamName: string): string {
    if (!teamName) return '??';
    const words = teamName.trim().split(' ');
    if (words.length === 1) {
      return teamName.substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // Color de la barra lateral según posición
  getPositionBadgeColor(position: number): string {
    if (position <= 4) return 'bg-green-500'; // Clasificación directa
    if (position <= 8) return 'bg-blue-500';  // Repechaje
    if (position >= this.leaderBoardList.length - 2) return 'bg-red-500'; // Descenso
    return 'bg-gray-400'; // Zona media
  }

  // Clase de fondo para filas según posición
  getPositionClass(position: number): string {
    if (position <= 4) return 'bg-green-50/30 dark:bg-green-900/10';
    if (position <= 8) return 'bg-blue-50/30 dark:bg-blue-900/10';
    if (position >= this.leaderBoardList.length - 2) return 'bg-red-50/30 dark:bg-red-900/10';
    return '';
  }

  // Border color para cards mobile
  getPositionBorderColor(position: number): string {
    if (position <= 4) return 'border-green-500';
    if (position <= 8) return 'border-blue-500';
    if (position >= this.leaderBoardList.length - 2) return 'border-red-500';
    return 'border-gray-300 dark:border-neutral-700';
  }
}