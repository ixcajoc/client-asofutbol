import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../services/report-service.service';
import { Banner } from '../../banner/banner';
import { ExportButton } from '../../export-button/export-button';

@Component({
  selector: 'app-games-by-day',
  imports: [CommonModule, FormsModule, Banner, ExportButton],
  templateUrl: './games-by-day.html',
  styleUrl: './games-by-day.css'
})
export class GamesByDay {
  gamesList: any[] = [];
  filteredList: any[] = [];

  // Filtros
  seasons: any[] = []; // { id, nombre }
  matchdays: number[] = [];
  statuses: string[] = ['FINALIZADO', 'EN_CURSO', 'PROGRAMADO', 'SUSPENDIDO', 'CANCELADO'];

  selectedSeason: number = 1; // default
  selectedMatchday: number | string = 'TODAS';
  selectedStatus = 'TODOS';
  search = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadSeasons();
  }

  // Cargar temporadas (ajusta según tu API)
  loadSeasons() {
    // Ejemplo: si tienes un endpoint para temporadas
    // this.reportService.getSeasons().subscribe(...)
    // Por ahora hardcodeamos:
    this.seasons = [
      { id: 1, nombre: 'Temporada 2024' },
      { id: 2, nombre: 'Temporada 2023' }
    ];
    this.selectedSeason = this.seasons[0]?.id || 1;
    this.getGamesByDay();
  }

  // Cambio de temporada: recargar partidos
  onSeasonChange() {
    this.selectedMatchday = 'TODAS';
    this.getGamesByDay();
  }

  // Cambio de jornada: si es "TODAS" carga todo, si no filtra
  onMatchdayChange() {
    if (this.selectedMatchday === 'TODAS') {
      this.getGamesByDay();
    } else {
      this.getGamesByMatchday(this.selectedMatchday as number);
    }
  }

  // Cargar todos los partidos de la temporada
  getGamesByDay() {
    // Ajusta según tu endpoint: si necesitas pasar seasonId sin matchday
    // O si tienes un endpoint diferente para "todos los partidos de la temporada"
    this.reportService.getGamesByDay(this.selectedSeason).subscribe({
      next: (response) => {
        this.gamesList = response.data || [];
        this.extractMatchdays();
        this.applyFilters();
      },
      error: (error) => console.error(error)
    });
  }

  // Cargar partidos de una jornada específica
  getGamesByMatchday(matchday: number) {
    this.reportService.getGamesByMatchday(this.selectedSeason, matchday).subscribe({
      next: (response) => {
        this.gamesList = response.data || [];
        this.extractMatchdays();
        this.applyFilters();
      },
      error: (error) => console.error(error)
    });
  }

  // Extraer jornadas únicas de los partidos
  extractMatchdays() {
    const unique = Array.from(new Set(this.gamesList.map(g => g.numero_jornada).filter(Boolean)));
    this.matchdays = unique.sort((a, b) => a - b);
  }

  // Filtrado
  applyFilters() {
    const term = this.search.trim().toLowerCase();
    const status = this.selectedStatus;

    let list = [...this.gamesList];

    if (status && status !== 'TODOS') {
      list = list.filter(g => g.estado === status);
    }

    if (term) {
      list = list.filter(g =>
        (g.equipo_local || '').toLowerCase().includes(term) ||
        (g.equipo_visitante || '').toLowerCase().includes(term) ||
        (g.estadio || '').toLowerCase().includes(term) ||
        `${g.arbitro_nombre || ''} ${g.arbitro_apellido || ''}`.toLowerCase().includes(term)
      );
    }

    this.filteredList = list;
  }

  // Formateo de fecha y hora
  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  formatTime(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Clase de marcador (ganador en verde, perdedor en rojo, empate en gris)
  getScoreClass(golesLocal: number, golesVisitante: number, tipo: 'local' | 'visitante', estado: string): string {
    if (estado !== 'FINALIZADO' || golesLocal == null || golesVisitante == null) {
      return 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-300';
    }

    const isWinner = tipo === 'local' ? golesLocal > golesVisitante : golesVisitante > golesLocal;
    const isDraw = golesLocal === golesVisitante;

    if (isDraw) return 'bg-gray-200 text-gray-700 dark:bg-neutral-600 dark:text-neutral-200';
    if (isWinner) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
  }

  // Clase de estado
  getStatusClass(estado: string): string {
    switch (estado?.toUpperCase()) {
      case 'FINALIZADO':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'EN_CURSO':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'PROGRAMADO':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'SUSPENDIDO':
      case 'CANCELADO':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-300';
    }
  }

  // Totales
  getTotalGoals(): number {
    return this.filteredList.reduce((sum, g) => sum + (g.goles_local || 0) + (g.goles_visitante || 0), 0);
  }
  getAvgGoalsPerMatch(): string {
    if (this.filteredList.length === 0) return '0.00';
    return (this.getTotalGoals() / this.filteredList.length).toFixed(2);
  }

  get exportData() {
    return this.filteredList;
  }
}