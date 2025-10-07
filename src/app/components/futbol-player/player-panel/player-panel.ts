import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerCard } from './player-card/player-card';
import { PlayerService } from '../../../services/player-service.service';
import { Banner } from '../../../shared/banner/banner';
import { Paginator } from '../../../shared/paginator/paginator';
import { ExportButton } from "../../../shared/export-button/export-button";

@Component({
  selector: 'app-player-panel',
  imports: [
    CommonModule,
    PlayerCard,
    Banner,
    Paginator,
    ExportButton
],
  templateUrl: './player-panel.html',
  styleUrl: './player-panel.css'
})
export class PlayerPanel {

  playerList: any[] = [];
  currentPage = 1;
  limit = 10;
  totalItems = 0;
  totalPages = 0;
  isLoading = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers(): void {
    this.isLoading = true;
    this.playerService.getAllPlayers(this.currentPage, this.limit).subscribe({
      next: (response) => {
        this.playerList = response.data;
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.pages;
        this.currentPage = response.pagination.page;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllPlayers();
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1; // resetear a página 1
    this.getAllPlayers();
  }

  onPlayerDeleted(playerId: number): void {
    this.playerList = this.playerList.filter(
      (player: any) => player.id_jugador !== playerId
    );
    this.totalItems = Math.max(0, this.totalItems - 1);
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.limit));
    
    // Si la página actual queda vacía y no es la primera, retroceder
    if (this.playerList.length === 0 && this.currentPage > 1) {
      this.currentPage--;
      this.getAllPlayers();
    }
  }
}
