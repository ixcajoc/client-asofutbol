import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeasonService } from '../../../services/season-service.service';
import { MessageService } from '../../../services/message-service.service';
import { Banner } from "../../../shared/banner/banner";

@Component({
  selector: 'app-all-seasons',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Banner],
  templateUrl: './all-seasons.html',
  styleUrl: './all-seasons.css'
})
export class AllSeasonsComponent implements OnInit {

  seasonList: any[] = [];
  filteredSeasons: any[] = [];

  // Filtros mínimos
  availableYears: number[] = [];
  selectedYear: number | null = null;
  search = '';

  constructor(
    private seasonService: SeasonService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSeasons();
  }

  loadSeasons() {
    this.seasonService.getAllSeasons().subscribe({
      next: (res) => {
        const raw = res.data ?? res ?? [];
        // Normaliza posibles variantes de 'año'
        this.seasonList = raw.map((s: any) => ({
          ...s,
          id_temporada: Number(s.id_temporada),
          anioNorm: Number(s['año'] ?? s.anio ?? s.year ?? s.ANIO ?? s.Año ?? null)
        }));
        this.buildAvailableYears();
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
        this.message.errorAlert('Error al cargar las temporadas');
      }
    });
  }

  buildAvailableYears() {
    const set = new Set<number>();
    for (const s of this.seasonList) {
      if (!Number.isNaN(s.anioNorm) && s.anioNorm != null) set.add(s.anioNorm);
    }
    this.availableYears = Array.from(set).sort((a, b) => b - a); // Desc
  }

  applyFilters() {
    const term = this.search.trim().toLowerCase();

    let list = [...this.seasonList];

    if (this.selectedYear != null) {
      list = list.filter(s => s.anioNorm === this.selectedYear);
    }

    if (term) {
      list = list.filter(s => (s.nombre ?? '').toLowerCase().includes(term));
    }

    this.filteredSeasons = list;
  }

  deleteSeason(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta temporada?')) {
      this.seasonService.deleteSeason(id).subscribe({
        next: () => {
          this.message.successAlert();
          this.loadSeasons();
        },
        error: (err) => {
          console.error(err);
          this.message.errorAlert('No se pudo eliminar la temporada');
        }
      });
    }
  }

  activateSeason(id: number) {
    this.seasonService.activateSeason(id).subscribe({
      next: () => {
        this.message.successAlert();
        this.loadSeasons();
      },
      error: (err) => {
        console.error(err);
        this.message.errorAlert('No se pudo activar la temporada');
      }
    });
  }
}