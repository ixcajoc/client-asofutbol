import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TableUsers } from './table-users/table-users';
import { RouterModule } from '@angular/router';
import { Banner } from '../../../shared/banner/banner';
import { ExportButton } from '../../../shared/export-button/export-button';


@Component({
  selector: 'app-panel-user',
  imports: [
    CommonModule,
    RouterModule,
    Banner,
    ExportButton
    
  ],
  templateUrl: './panel-user.html',
  styleUrl: './panel-user.css'
})
export class PanelUser {

  userList : any = []
  

  constructor(
      private userService : UserService,

  ){}

  ngOnInit(){
    this.getAllUsers();
  }


  getAllUsers(){
        this.userService.getAllUsers().subscribe({
          next:(response)=>{
              this.userList = response.data;
              // console.log(this.userList);
          },
          error: (error) => (console.log(error))
        });
  } 
  
    confirmarEliminar(userId:number) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta accion.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(userId);
          this.getAllUsers()
        }
      });
    }

    deleteUser(userId:number){
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          console.log(response)
          // this.userDeleted.emit(playerId);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Item eliminado.",
            icon: "success"
          });
  
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          Swal.fire({
            title: "Algo salió mal",
            text: `Error: ${errorMessage}`,
            icon: "error"
          });
        }
      });  
    }


}
