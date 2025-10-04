import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/report-service.service';
import { Banner } from '../../banner/banner';
import { ExportButton } from '../../export-button/export-button';

@Component({
  selector: 'app-discipline-table',
  imports: [
    CommonModule,
    Banner,
    ExportButton,
  ],
  templateUrl: './discipline-table.html',
  styleUrl: './discipline-table.css'
})
export class DisciplineTable {

  disciplineList: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getDisciplineReport();
  }

  getDisciplineReport() {
    this.reportService.getDisciplineTable().subscribe({
      next: (response) => {
        this.disciplineList = response.data;
        console.log('Reporte disciplinario:', this.disciplineList);
      },
      error: (error) => {
        console.error('Error al cargar reporte disciplinario:', error);
      }
    });
  }

  // Obtener array para renderizar tarjetas visuales (máximo 5)
  getCardArray(count: number): number[] {
    return Array(Math.min(count, 5)).fill(0);
  }

  // Calcular promedio de tarjetas por partido
  getCardAverage(totalCards: number, matchesPlayed: number): string {
    if (matchesPlayed === 0) return '0.00';
    return (totalCards / matchesPlayed).toFixed(2);
  }

  // Clase de badge según total de tarjetas
  getTotalBadgeClass(total: number): string {
    if (total >= 7) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    if (total >= 5) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    if (total >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

  // Clase de fila según severidad
  getDisciplineRowClass(total: number): string {
    if (total >= 7) return 'bg-red-50/30 dark:bg-red-900/10';
    if (total >= 5) return 'bg-orange-50/30 dark:bg-orange-900/10';
    return '';
  }

  // Clase de borde para cards mobile
  getDisciplineBorderClass(total: number): string {
    if (total >= 7) return 'border-l-4 border-red-600';
    if (total >= 5) return 'border-l-4 border-orange-500';
    if (total >= 3) return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-gray-300 dark:border-neutral-700';
  }

  // Gradiente según posición
  getPositionGradient(position: string): string {
    switch (position?.toUpperCase()) {
      case 'PORTERO':
        return 'bg-gradient-to-br from-emerald-500 to-teal-600';
      case 'DEFENSA':
        return 'bg-gradient-to-br from-sky-500 to-blue-600';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':
        return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'DELANTERO':
        return 'bg-gradient-to-br from-rose-500 to-red-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  }

  // Color de badge de posición
  getPositionBadgeColor(position: string): string {
    switch (position?.toUpperCase()) {
      case 'PORTERO':
        return 'bg-emerald-500 text-white';
      case 'DEFENSA':
        return 'bg-sky-500 text-white';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':
        return 'bg-amber-500 text-white';
      case 'DELANTERO':
        return 'bg-rose-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  // Abreviatura de posición
  getPositionAbbr(position: string): string {
    switch (position?.toUpperCase()) {
      case 'PORTERO':
        return 'PT';
      case 'DEFENSA':
        return 'DF';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':
        return 'MC';
      case 'DELANTERO':
        return 'DL';
      default:
        return '?';
    }
  }

  // Total de tarjetas amarillas
  getTotalYellowCards(): number {
    return this.disciplineList.reduce((sum, player) => sum + (player.tarjetas_amarillas || 0), 0);
  }

  // Total de tarjetas rojas
  getTotalRedCards(): number {
    return this.disciplineList.reduce((sum, player) => sum + (player.tarjetas_rojas || 0), 0);
  }

  // Promedio general de tarjetas
  getAverageCards(): string {
    if (this.disciplineList.length === 0) return '0.00';
    const total = this.disciplineList.reduce((sum, player) => sum + (player.total_tarjetas || 0), 0);
    return (total / this.disciplineList.length).toFixed(2);
  }
}