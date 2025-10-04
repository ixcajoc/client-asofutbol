import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-paginator',
  imports: [
    CommonModule,
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() limit: number = 10;
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  get startItem(): number {
    return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.limit + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.limit, this.totalItems);
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // cantidad de botones numéricos visibles

    if (this.totalPages <= maxVisible) {
      // Mostrar todas las páginas
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica con elipsis
      if (this.currentPage <= 3) {
        // Inicio: 1 2 3 4 ... último
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Final: 1 ... antepenúltimo penúltimo último
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Medio: 1 ... actual-1 actual actual+1 ... último
        pages.push(1);
        pages.push('...');
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push('...');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  goToPage(page: number | string): void {
    if (typeof page === 'string') return; // ignorar elipsis
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  changeLimit(newLimit: number): void {
    if (newLimit !== this.limit) {
      this.limitChange.emit(newLimit);
    }
  }

}
