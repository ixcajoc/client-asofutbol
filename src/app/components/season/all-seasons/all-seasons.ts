import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeasonService } from '../../../services/season-service.service';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-all-seasons',
  imports: [CommonModule, RouterModule],
  templateUrl: './all-seasons.html',
  styleUrl: './all-seasons.css'
})
export class AllSeasonsComponent implements OnInit {

  seasonList: any[] = [];

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
        this.seasonList = res.data;
      },
      error: (err) => {
        console.error(err);
        this.message.errorAlert('Error al cargar las temporadas');
      }
    });
  }

  // editSeason(season: any) {
  //   // Aquí puedes navegar a un form de edición
  //   this.message.showInfo(`Editar temporada ${season.nombre}`);
  // }

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