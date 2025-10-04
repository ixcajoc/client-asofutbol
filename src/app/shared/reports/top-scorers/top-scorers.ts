import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../services/report-service.service';
import { ExportButton } from '../../export-button/export-button';
import { Banner } from '../../banner/banner';

type SortKey = 'goles' | 'asistencias' | 'promedio' | 'aporte';

@Component({
  selector: 'app-top-scorers',
  imports: [CommonModule, FormsModule, ExportButton, Banner],
  templateUrl: './top-scorers.html',
  styleUrl: './top-scorers.css'
})
export class TopScorers {
  scorersList: any[] = [];
  filteredList: any[] = [];

  // Filtros
  teams: string[] = [];
  positions: string[] = ['PORTERO', 'DEFENSA', 'MEDIOCAMPISTA', 'MEDIO', 'DELANTERO'];
  selectedTeam = 'TODOS';
  selectedPosition = 'TODAS';
  search = '';

  // Orden
  sortKey: SortKey = 'goles';
  sortDir: 'asc' | 'desc' = 'desc';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getScorersTop();
  }

  getScorersTop() {
    this.reportService.getScorersTop().subscribe({
      next: (response) => {
        this.scorersList = (response.data || []).map((p: any) => ({
          ...p,
          _promedioCalc: this.getGoalsAverageNumber(p.goles, p.partidos_jugados),
          _aportePct: this.getContributionPct(p.goles, p.asistencias, p.partidos_jugados)
        }));
        this.teams = ['TODOS', ...Array.from(new Set(this.scorersList.map(p => p.equipo).filter(Boolean)))];
        this.applyFilters();
      },
      error: (error) => console.error(error)
    });
  }

  // Promedio de goles
  getGoalsAverage(goles: number, pj: number): string {
    return this.getGoalsAverageNumber(goles, pj).toFixed(2);
  }
  getGoalsAverageNumber(goles: number, pj: number): number {
    if (!pj) return 0;
    return goles / pj;
  }

  // Aporte ofensivo: (goles + asistencias) por partido normalizado a 1.5 = 100%
  getContributionPct(goles: number, asist: number, pj: number): number {
    if (!pj) return 0;
    const porPartido = (goles + asist) / pj;
    const umbral = 1.5;
    return Math.min(100, Math.round((porPartido / umbral) * 100));
  }

  // Totales y promedio global (sobre lista filtrada)
  getTotalGoals(): number {
    return this.filteredList.reduce((sum, p) => sum + (p.goles || 0), 0);
  }
  getGlobalGoalsAvg(): string {
    const totalPj = this.filteredList.reduce((sum, p) => sum + (p.partidos_jugados || 0), 0);
    if (!totalPj) return '0.00';
    const totalGol = this.getTotalGoals();
    return (totalGol / totalPj).toFixed(2);
  }

  // Estilo por posición (coherente con tus otros reportes)
  getPositionGradient(pos: string): string {
    switch ((pos || '').toUpperCase()) {
      case 'PORTERO': return 'bg-gradient-to-br from-emerald-500 to-teal-600';
      case 'DEFENSA': return 'bg-gradient-to-br from-sky-500 to-blue-600';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':   return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'DELANTERO': return 'bg-gradient-to-br from-rose-500 to-red-600';
      default: return 'bg-gradient-to-br from-gray-500 to-gray-700';
    }
  }
  getPositionBadgeColor(pos: string): string {
    switch ((pos || '').toUpperCase()) {
      case 'PORTERO': return 'bg-emerald-500 text-white';
      case 'DEFENSA': return 'bg-sky-500 text-white';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':   return 'bg-amber-500 text-white';
      case 'DELANTERO': return 'bg-rose-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }
  getPositionAbbr(pos: string): string {
    switch ((pos || '').toUpperCase()) {
      case 'PORTERO': return 'PT';
      case 'DEFENSA': return 'DF';
      case 'MEDIOCAMPISTA':
      case 'MEDIO':   return 'MC';
      case 'DELANTERO': return 'DL';
      default: return '?';
    }
  }

  // Color del promedio de goles
  getGoalsAvgColorClass(avg: number | string): string {
    const v = typeof avg === 'string' ? parseFloat(avg) : avg || 0;
    if (v >= 0.8) return 'text-rose-600 dark:text-rose-400';
    if (v >= 0.4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-700 dark:text-neutral-300';
  }

  // Filtrado + orden
  applyFilters() {
    const term = this.search.trim().toLowerCase();
    const team = this.selectedTeam;
    const pos = this.selectedPosition;

    let list = [...this.scorersList];

    if (team && team !== 'TODOS') {
      list = list.filter(p => p.equipo === team);
    }

    if (pos && pos !== 'TODAS') {
      list = list.filter(p => (p.posicion || '').toUpperCase() === pos);
    }

    if (term) {
      list = list.filter(p =>
        `${p.nombre || ''} ${p.apellido || ''}`.toLowerCase().includes(term) ||
        (p.equipo || '').toLowerCase().includes(term) ||
        (p.posicion || '').toLowerCase().includes(term)
      );
    }

    this.filteredList = this.sortList(list);
  }

  sortBy(key: SortKey) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'desc';
    }
    this.filteredList = this.sortList(this.filteredList);
  }

  private sortList(list: any[]): any[] {
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      const va = this.getSortValue(a);
      const vb = this.getSortValue(b);
      return (va - vb) * dir;
    });
  }

  private getSortValue(p: any): number {
    switch (this.sortKey) {
      case 'goles': return Number(p.goles) || 0;
      case 'asistencias': return Number(p.asistencias) || 0;
      case 'promedio': return Number(p._promedioCalc) || 0;
      case 'aporte': return Number(p._aportePct) || 0;
      default: return 0;
    }
  }

  // Exporta la lista filtrada
  get exportData() {
    return this.filteredList;
  }
}