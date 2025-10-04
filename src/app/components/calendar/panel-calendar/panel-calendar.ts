import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { GamesService } from '../../../services/games-service.service';

import { Banner } from '../../../shared/banner/banner';
import { ExportButton } from '../../../shared/export-button/export-button';
import { SeasonService } from '../../../services/season-service.service';
import { JornadaService } from '../../../services/jornada-service.service';

@Component({
  selector: 'app-panel-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Banner, ExportButton],
  templateUrl: './panel-calendar.html',
  styleUrl: './panel-calendar.css'
})
export class PanelCalendar implements OnInit {
  // Data
  gamesList: any[] = [];
  filteredList: any[] = [];

  seasons: any[] = []; // { id: number, nombre: string, activa: boolean }
  jornadasList: any[] = []; // jornadas completas
  visibleJornadas: any[] = []; // jornadas de la temporada seleccionada

  // Filtros
  search = '';
  statuses: string[] = ['FINALIZADO', 'EN_CURSO', 'PROGRAMADO', 'SUSPENDIDO', 'CANCELADO'];
  selectedStatus: string = 'TODOS';
  selectedSeason: number | null = null; // id_temporada
  selectedMatchday: number | 'TODAS' = 'TODAS'; // id_jornada o 'TODAS'

  // Temporada activa
  activeSeason: any | null = null;

  constructor(
    private gamesService: GamesService,
    private seasonsService: SeasonService,
    private jornadasService: JornadaService,
  ) {}

  ngOnInit(): void {
    this.loadSeasonsThenData();
  }

  // 1) Cargar temporadas, detectar activa, setear default, luego jornadas y partidos
  private loadSeasonsThenData(): void {
    this.seasonsService.getAllSeasons().subscribe({
      next: (res) => {
        const raw = res.data ?? res ?? [];
        this.seasons = raw.map((s: any) => ({
          id: Number(s.id_temporada),
          nombre: s.nombre,
          activa: !!s.activa
        }));
        this.activeSeason = this.seasons.find(s => s.activa) ?? null;
        this.selectedSeason = this.activeSeason?.id ?? this.seasons[0]?.id ?? null;
      },
      error: (e) => console.error('Error temporadas:', e),
      complete: () => {
        this.loadJornadas();
        this.loadMatches();
      }
    });
  }

  private loadJornadas(): void {
    this.jornadasService.getAllJornadas().subscribe({
      next: (res) => {
        const raw = res.data ?? res ?? [];
        this.jornadasList = raw.map((j: any) => ({
          ...j,
          id_temporada: Number(j.id_temporada),
          id_jornada: Number(j.id_jornada),
          numero_jornada: Number(j.numero_jornada),
        }));
        this.applyVisibleJornadas();
      },
      error: (e) => console.error('Error jornadas:', e)
    });
  }

  private loadMatches(): void {
    // Carga amplia; si prefieres server-side, puedes pasar params { season, status, ... }
    this.gamesService.getAllGames().subscribe({
      next: (res) => {
        const raw = res.data ?? res ?? [];
        this.gamesList = raw.map((g: any) => ({
          ...g,
          id_partido: Number(g.id_partido),
          id_jornada: Number(g.id_jornada),
          id_temporada: Number(g.id_temporada),
          // Aliases para la vista "reporte" si los usas allí:
          equipo_local: g.equipo_local_nombre,
          equipo_visitante: g.equipo_visitante_nombre,
          local_corto: g.equipo_local_corto,
          visitante_corto: g.equipo_visitante_corto
        }));
        this.applyFilters();
      },
      error: (e) => console.error('Error partidos:', e)
    });
  }

  // 2) Handlers de filtros
  onSeasonChange(): void {
    // Al cambiar temporada, reset jornada y aplicar
    this.selectedMatchday = 'TODAS';
    this.applyVisibleJornadas();
    this.applyFilters();
  }

  onMatchdayChange(): void {
    // Si es 'TODAS' no filtramos por jornada, si no filtramos por id_jornada
    this.applyFilters();
  }

  applyVisibleJornadas(): void {
    if (this.selectedSeason != null) {
      this.visibleJornadas = this.jornadasList
        .filter(j => j.id_temporada === this.selectedSeason)
        .sort((a, b) => a.numero_jornada - b.numero_jornada);
    } else {
      this.visibleJornadas = [...this.jornadasList];
    }
  }

  applyFilters(): void {
    const term = this.search.trim().toLowerCase();
    const status = this.selectedStatus;

    let list = this.gamesList.filter(g => {
      const bySeason = this.selectedSeason == null || g.id_temporada === this.selectedSeason;
      const byJornada = this.selectedMatchday === 'TODAS' || g.id_jornada === this.selectedMatchday;
      const byStatus = status === 'TODOS' || (g.estado ?? '').toUpperCase() === status;
      return bySeason && byJornada && byStatus;
    });

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

  // 3) Helpers UI
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

  getScoreClass(gL: number, gV: number, tipo: 'local' | 'visitante', estado: string): string {
    if ((estado ?? '').toUpperCase() !== 'FINALIZADO' || gL == null || gV == null) {
      return 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-300';
    }
    const isWinner = tipo === 'local' ? gL > gV : gV > gL;
    const isDraw = gL === gV;
    if (isDraw) return 'bg-gray-200 text-gray-700 dark:bg-neutral-600 dark:text-neutral-200';
    if (isWinner) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
  }

  getStatusClass(estado: string): string {
    switch ((estado ?? '').toUpperCase()) {
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

  // KPIs
  getTotalGoals(): number {
    return this.filteredList.reduce((sum, g) => sum + (g.goles_local || 0) + (g.goles_visitante || 0), 0);
  }
  getAvgGoalsPerMatch(): string {
    if (this.filteredList.length === 0) return '0.00';
    return (this.getTotalGoals() / this.filteredList.length).toFixed(2);
  }

  // Export
  get exportData() {
    return this.filteredList;
  }

  // Acciones opcionales (si mantienes botones de editar/eliminar)
  confirmarEliminar(gameId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((r) => {
      if (r.isConfirmed) this.deleteGame(gameId);
    });
  }
  deleteGame(gameId: number): void {
    this.gamesService.deleteGame(gameId).subscribe({
      next: () => {
        this.gamesList = this.gamesList.filter(g => g.id_partido !== gameId);
        this.applyFilters();
        Swal.fire('¡Eliminado!', 'Partido eliminado correctamente.', 'success');
      },
      error: (e) => {
        const msg = e.error?.message || 'Error desconocido';
        Swal.fire('Algo salió mal', `Error: ${msg}`, 'error');
      }
    });
  }
}