import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user-service.service';
import { Banner } from '../../../shared/banner/banner';
import { ExportButton } from '../../../shared/export-button/export-button';
import { Paginator } from "../../../shared/paginator/paginator";

@Component({
  selector: 'app-panel-user',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Banner,
    ExportButton,
    Paginator
],
  templateUrl: './panel-user.html',
  styleUrl: './panel-user.css'
})
export class PanelUser {

  userList: any[] = [];
  filteredUserList: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  limit = 10;
  totalItems = 0;
  totalPages = 0;
  isLoading = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.onSearch();
  }

  getAllUsers() {
    this.userService.getAllUsers(this.currentPage, this.limit).subscribe({
      next: (response) => {
        this.userList = response.data;
        this.filteredUserList = [...this.userList]; // Copia para filtrado
        // console.log('Usuarios cargados:', this.userList);
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.pages;
        this.currentPage = response.pagination.page;

      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los usuarios',
          icon: 'error'
        });
      }
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllUsers();
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1; // resetear a página 1
    this.getAllUsers();
  }

  // Búsqueda en tiempo real
  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredUserList = [...this.userList];
      return;
    }

    this.filteredUserList = this.userList.filter(user =>
      user.nombre?.toLowerCase().includes(term) ||
      user.apellido?.toLowerCase().includes(term) ||
      user.username?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      // user.activo?.toLowerCase().includes(term) ||
      user.nombre_rol?.toLowerCase().includes(term)
    );
  }

  // Obtener iniciales para avatar
  getInitials(nombre?: string, apellido?: string): string {
    const n = (nombre || '').charAt(0).toUpperCase();
    const a = (apellido || '').charAt(0).toUpperCase();
    return n + a || '??';
  }

  // Tiempo relativo para "último acceso"
  getRelativeTime(fecha?: string): string {
    if (!fecha) return 'Nunca';
    
    try {
      const ahora = new Date();
      const entonces = new Date(fecha);
      const diff = ahora.getTime() - entonces.getTime();
      const minutos = Math.floor(diff / (1000 * 60));
      const horas = Math.floor(diff / (1000 * 60 * 60));
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (minutos < 1) return 'Ahora';
      if (minutos < 60) return `Hace ${minutos} min`;
      if (horas < 24) return `Hace ${horas}h`;
      if (dias === 0) return 'Hoy';
      if (dias === 1) return 'Ayer';
      if (dias < 7) return `Hace ${dias} días`;
      if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
      if (dias < 365) return `Hace ${Math.floor(dias / 30)} meses`;
      return `Hace ${Math.floor(dias / 365)} años`;
    } catch (e) {
      return 'Fecha inválida';
    }
  }

  // Confirmación de eliminación
  confirmarEliminar(userId: number) {
    const user = this.userList.find(u => u.id_usuario === userId);
    const userName = user ? `${user.nombre} ${user.apellido}` : 'este usuario';

    Swal.fire({
      title: '¿Estás seguro?',
      html: `Se eliminará a <strong>${userName}</strong>.<br>Esta acción no se puede revertir.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
      }
    });
  }

  // Eliminar usuario
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        
        // Actualizar lista local sin recargar desde el servidor
        this.userList = this.userList.filter(u => u.id_usuario !== userId);
        this.filteredUserList = this.filteredUserList.filter(u => u.id_usuario !== userId);
        
        Swal.fire({
          title: '¡Eliminado!',
          text: 'Usuario eliminado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
        const errorMessage = error.error?.message || 'Error desconocido al eliminar el usuario';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#3b82f6'
        });
      }
    });
  }

  // Exportar usuarios (si usas el componente ExportButton)
  // exportUsers() {
  //   // Implementa tu lógica de exportación
  //   console.log('Exportando usuarios...', this.filteredUserList);
  // }

  // Obtener color de badge según rol
  getRoleBadgeClass(rol?: string): string {
    switch (rol?.toUpperCase()) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'ENTRENADOR':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'JUGADOR':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  }

  // Trackby para optimizar renderizado
  trackByUserId(index: number, user: any): number {
    return user.id_usuario;
  }
}