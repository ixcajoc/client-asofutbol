import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser {

  userUpdateForm: FormGroup;
  userId: number = 0; // ID del usuario a actualizar
  isEditMode: boolean = false;
  userList :any = []
  userData: any = {}

  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
      this.userUpdateForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: [''], // Opcional
        fecha_nacimiento: ['', Validators.required],
        id_rol: [''], // Solo si es admin
        activo: [true] // Para activar/desactivar usuario
      });
  }

  ngOnInit(){
    this.getUserById()
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

  roles = [
    { id: 1, nombre: 'ADMINISTRADOR' },
    { id: 2, nombre: 'ARBITRO' },
    { id: 3, nombre: 'ENTRENADOR' },
    { id: 4, nombre: 'JUGADOR' },
    { id: 5, nombre: 'COMUNIDAD' }
];
  getUserById() {
    const userId = this.route.snapshot.params['userId'];

    this.userService.getUsersById(userId).subscribe({
      next: (response)=> {
        // console.log(response.data)
        this.userData = response.data;

        // const fechaCompleta = this.userData.fecha_nacimiento;
        // const fechaFormateada = fechaCompleta.split("T")[0]; 
        const fechaCompleta = new Date(this.userData.fecha_nacimiento);
        const dia = String(fechaCompleta.getDate()).padStart(2, '0');
        const mes = String(fechaCompleta.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses son de 0 a 11
        const anio = fechaCompleta.getFullYear();
        // const fechaFormateada = `${dia}-${mes}-${anio}`
        const fechaFormateada = `${anio}-${mes}-${dia}`

        this.userUpdateForm.patchValue({
          username: this.userData.username,
          email: this.userData.email,
          nombre: this.userData.nombre,
          apellido: this.userData.apellido,
          telefono: this.userData.telefono,
          fecha_nacimiento: fechaFormateada,
          // fecha_nacimiento: this.userData.fechaFormateada,
          id_rol: this.userData.id_rol,
          activo: this.userData.activo
        });

      },
      error: (error) => {console.log(error)}
    });
  }


  updateUser(){
    let updatedUser = {
    username: this.userUpdateForm.value.username ?? '',
    email: this.userUpdateForm.value.email ?? '',
    nombre: this.userUpdateForm.value.nombre ?? '',
    apellido: this.userUpdateForm.value.apellido ?? '',
    telefono: this.userUpdateForm.value.telefono ?? '',
    fecha_nacimiento: this.userUpdateForm.value.fecha_nacimiento ?? '',
    id_rol: this.userUpdateForm.value.id_rol ?? '',
    activo: this.userUpdateForm.value.activo ?? true

  };

    // console.log(updatedUser);

    this.userService.updateUser(this.userData.id_usuario, updatedUser).subscribe({
      next: (response)=> {
        this.messageService.successAlert()
        console.log(response)
        this.userUpdateForm.reset();
        this.router.navigate(['/dashboard1/panel-users']);
        
      },
      error: (error) => {
        this.messageService.errorAlert(error)
        console.log(error)
      }
    });
  }


  

  
  
}